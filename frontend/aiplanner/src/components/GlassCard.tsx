export default function GlassCard({children}:any){

    return(
  
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl">
  
        {children}
  
      </div>
  
    )
  
  }