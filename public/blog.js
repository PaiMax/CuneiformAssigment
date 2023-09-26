let flag=0;
let idtoedit=0;
const list=document.getElementById('list');
document.getElementById('Add').addEventListener('click',add);



function add(e){

    const title=document.getElementById('title').value;
    const description=document.getElementById('description').value;
    const category=document.getElementById('category').value;

    
    
    e.preventDefault();
    console.log("hi");
    const date = new Date();
        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        let currentYear = date.getFullYear();
        //the date as DD-MM-YYYY 
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    
    
    let obj={
        Title:title,
        Description:description,
        Category:category,
        Date:currentDate
    }
   

    if(flag==1){
        flag=0;
        updateArticle(idtoedit,obj);

    }
    else{
        post(obj);

    }
    
}



async function post(article){
   

    const data=await axios.post('http://localhost:3001/article/insert',article);
    console.log(data.data.article);

    showArticles(data.data);
}



function deleteArticle(id){
    
        console.log("delelte");
        const nodetodelte=document.getElementById(id);
        if(nodetodelte){
            list.removeChild(nodetodelte);
            axios.delete(`http://localhost:3001/article/deleteArticle/${id}`)
            .then((result)=>console.log('deleted'))
            .catch((err)=>console.log(err));
    
        }
       
        
    }



function editArticle(id,title,description,category){
    
        console.log("in edit functio n");
       
        document.getElementById('title').value=title;
        document.getElementById('description').value=description;
        document.getElementById('category').value=category;
        flag=1;
        idtoedit=id;
        
    
    

}

function updateexpense(id,obj){
    axios.put(`http://localhost:3001/article/updateArticle/${id}`,obj)
    .then((r)=>console.log('updated'))
    .catch(err=>console.log(err));
}



function showArticles(data){
    console.log(data._id);
    
    const childHTML = `<tr id=${data._id}>
    <td>${data.Title}</td>
    <td>${data.Description}</td>
    <td>${data.Category}</td>
    <td>
      <button onclick='deleteArticle("${data._id}")'>Delete</button>
      <button onclick='editArticle("${data._id}", "${data.Title}", "${data.Description}", "${data.Category}")'>Edit</button>
    </td>
  </tr>`;
  
  list.innerHTML=list.innerHTML+childHTML;
} 


document.addEventListener('DOMContentLoaded',fetchData);
async function fetchData(){
    const result=await axios.get('http://localhost:3001/article/getArticles');
    console.log(result.data.data.length);
    for(let i=0;i<result.data.data.length;i++){
        showArticles(result.data.data[i]);

    }
    


}


document.getElementById('search').addEventListener('click',search);
async function search(){
    const text=document.getElementById('searchInput').value;
    const result=await axios.get(`http://localhost:3001/article/search/${text}`);
    for(let i=0;i<result.data.data.length;i++){
        showSearches(result.data.data[i]);
    }

}

function showSearches(data){
    const div=document.getElementById('searchlist');
    const childHTML = `<li>${data.Title}-${data.Description}-${data.Category}</li>`;
    div.innerHTML=div.innerHTML+childHTML;
   

}


