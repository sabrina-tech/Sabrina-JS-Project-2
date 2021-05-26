function search(){
    let input =document.getElementById("search").value;
    console.log(input);
    searchApi(input)
    
}

 function searchApi(val){
    const header = {method:"GET", Authorization:"Bearer 2162a51a55a6e4c79db8730927a51886"}
    const url= `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${val}&limit=10&exchange=NASDAQ`
  
    fetch (url,header)
    .then((response)=>{
        return response.json()
    })
    .then ((data)=>{
       let results=""
       for(let i=0; i<data.length; i++){
           results=results+JSON.stringify(data[i])+"<br>"
       }
       document.getElementById("results").innerHTML=results
    })
   
}
