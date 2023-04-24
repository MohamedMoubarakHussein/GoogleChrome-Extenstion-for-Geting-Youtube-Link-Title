document.addEventListener('DOMContentLoaded', function() {
    var textbox1 = document.getElementById('btn1');
    var textbox2 = document.getElementById('btn2');
    var textbox3 = document.getElementById('btn3');
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        let currentTab = tabs[0];
      
        // Get the current URL
        let currentUrl = currentTab.url;
         currentUrl = currentUrl.replace(/&t=\d+s/, '');
        document.getElementById("textbox1").value = currentUrl;
        
        let title = currentTab.title;
        title = title.replace(/^\(\d+\)\s*/, '').replace(/-?\s*YouTube$/i, '');
        document.getElementById("textbox2").value = title;
     
      });
     
    // onClick's logic below:
    textbox1.addEventListener('click', function() {
        copyToClipboard('textbox1' , textbox1);
    });
    textbox2.addEventListener('click', function() {
        copyToClipboard('textbox2' , textbox2);
    });
    textbox3.addEventListener('click', function() {
        let timeString = document.getElementById("textbox3").value;
        let arr = timeString.split(':').map(Number);
        let totalSeconds ;
        if(arr.length == 2){
          totalSeconds = arr[0] * 60 + arr[1];
        }else{
          totalSeconds = arr[0]*3600 +arr[1] * 60 + arr[2];
        }
        
        document.getElementById("textbox3").value = totalSeconds;
        navigator.clipboard.writeText(totalSeconds)
        .then(function() {
  
         b.textContent = 'done'; 
         setTimeout(function() {
          b.textContent = 'Copy to Clipboard';
        }, 500);
      })
        .catch(function(error) {
          console.error("Error copying text to clipboard: ", error);
        });
    });
});

function copyToClipboard(id , b) {
    var text;
    if(id == 'textbox1') {

     text =document.getElementById("textbox1").value;
    }else{ text = document.getElementById("textbox2").value;
        }
    navigator.clipboard.writeText(text)
      .then(function() {

       b.textContent = 'done'; 
       setTimeout(function() {
        b.textContent = 'Copy to Clipboard';
      }, 500);
    })
      .catch(function(error) {
        console.error("Error copying text to clipboard: ", error);
      });

      
  }