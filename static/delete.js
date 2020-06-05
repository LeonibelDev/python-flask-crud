window.onload = (set_delete())

function set_delete(){

    for (var i = 0; i < document.querySelectorAll('#delete').length; i++) {
        document.querySelectorAll('#delete')[i].addEventListener('click', function(){
            
            var xml = new XMLHttpRequest()
            let method = "GET"
            const url = this.getAttribute("sm-data").toString() 


            xml.onreadystatechange = (function(res){})

            xml.open(method, url)
            xml.send()
            
            var del_elem = this.parentNode.parentNode
            del_elem.parentNode.removeChild(del_elem)
        })
    }
}