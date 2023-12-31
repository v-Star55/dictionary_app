const input=document.querySelector('#inputSearch');
const searchBtn=document.querySelector('#searchBtn');
const searchWord=document.querySelector('#word');
const meaning=document.querySelector('#meaning');
const form=document.querySelector('.form');
const hidden=document.querySelector('.hidden');

const blockquote=document.querySelector('#blockquote');
const author=document.querySelector('#author');
const loading=document.querySelector('.loading');


////////////////////////// Form 

form.addEventListener('submit',function(e){
    e.preventDefault();
    inputValue=input.value.trim().toLowerCase();
    getMeaning(inputValue);
    loading.style.display='flex';
    input.value='';
    
});

////////////////////////////// Fetching Data

const getMeaning=async(word)=>{
    let result;
    try {
        const response = await fetch(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'Paste the Dictionar API key HERE',
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
          }
        });                              

        if (response.ok) {               // If response is ok then we will get the data
            result = await response.json();
            hidden.style.opacity='1'; 
            loading.style.display='none';

        }
        if(!result.valid){
            searchWord.innerHTML=`${result.word}`;
            meaning.innerHTML=`<h3>Sorry, No results found</h3>`
        }else{
            searchWord.innerHTML=`${result.word}`;
            meaning.innerHTML=`${result.definition}`;
        }




      } catch (err) {
        console.error(err);
        meaning.innerHTML=`<h3>Sorry, No results found and ${err}</h3>`
      }
}


////////////////////// Quotes
const getQuotes=async()=>{
  const response=await fetch('https://famous-quotes4.p.rapidapi.com/random',{
    params: {
      category: 'all',
      count: '1'
    },
    headers: {
      'X-RapidAPI-Key': 'Paste the famous quote API key HERE',
      'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
    }
  });
  const [data]=await response.json();
  blockquote.innerHTML=`${data.text}`;
  author.innerHTML=`${data.author}`;
}

getQuotes();
