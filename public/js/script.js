const target = document.querySelectorAll('[data-anime]');
const animationClass= 'animate';

function animeScroll(){
    const windowTop = window.pageYOffset + ((window.innerHeight * 3.5)/4);
    target.forEach(function(element){
        if(windowTop > element.offsetTop){
            element.classList.add(animationClass);

        }
    });
}

function formatDate(data){
	var dia = data.getDate();
	if (dia.toString().length == 1){
		dia = "0"+dia;
	}
	var mes = data.getMonth()+1;
	if (mes.toString().length == 1){
		mes = "0"+mes;
	}
	var ano = data.getFullYear();  
	
	return dia+"/"+mes+"/"+ano;
}

animeScroll();
window.addEventListener('scroll', function() {
    animeScroll();
})