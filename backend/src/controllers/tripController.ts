import { Request, Response } from 'express';
import  pool  from '../config/db';
import { generateTripPlan } from '../services/aiPlannerService';
import { getHotelSuggestions } from '../services/hotelService';
import { getTransportOptions } from '../services/transportService';

export const planTrip = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id || 1;
    const { start, destination, interests, budget, days = 1 } = req.body;

    const aiPlan = await generateTripPlan(start, destination, parseInt(budget), parseInt(days), interests);

    // Integrate services for richer data
    const hotelText = await getHotelSuggestions(destination, parseInt(budget) / parseInt(days));
    const transportText = await getTransportOptions(start, destination);

    // Simple parse/merge (improve as needed)
    aiPlan.hotels = aiPlan.hotels || [];  // From AI
    aiPlan.transportDetails = transportText;  // Append raw text

    const result = await pool.query(
      `INSERT INTO trips (user_id, start_location, destination, budget, days, interests, plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, start, destination, budget, days, interests, JSON.stringify(aiPlan)]
    );

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Trip generation error:', error);
    res.status(500).json({ success: false, message: 'Trip generation failed', error: (error as Error).message });
  }
};

export const getUserTrips = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id || 1;
    const result = await pool.query(
      'SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Fetch trips error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch trips' });
  }
};

export const getTripById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM trips WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Fetch trip error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch trip' });
  }
};
