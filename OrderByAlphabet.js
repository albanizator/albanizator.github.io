/* 
ForvardOrder = булевое значение,
ForvardOrder == true - прямой порядок сортировки
ForvardOrder == false - обратный порядок сортировки
*/
var AlphabetPriority = false;
function SortText(strForSort,ForvardOrder,ap){
      //lines - исходные строки сортировки
      AlphabetPriority = ap;
	  var lines = strForSort.split("\n");
	  //chains - массивы строк-букв
	  var chains =  [];
	  var s = "";
	  for (pr in lines) {
		  chains.push(Strike(lines[pr]));
	  }
	  chains.sort(CompareChainesByAlphabet);
	  if (ForvardOrder == false){
	  	  chains.reverse();
	  }
	  var nl = "\n";
	  for (p1 in chains){
	    if (p1 == (chains.length - 1)){
	      nl = "";
	    }
	  	s = s + chains[p1].join("") + nl;
	  }
	  return s;
  }

  
  // задаем состав и порядрк следования букв в алфавите
  function Alphabet(){
	  var alpha = ["A","B","C","Ç","D","DH","E","Ë","F","G","GJ","H"
	          ,"I","J","K","L","LL","M","N","NJ","O","P","Q","R","RR"
	          ,"S","SH","T","TH","U","V","X","XH","Y","Z","ZH"];
	  var numeric = "0123456789".split("");
	  if (AlphabetPriority == true) {return alpha.concat(numeric)}
	  else {return numeric.concat(alpha)};
  }
  //создание массива символов, в т.ч. двойных, на основе строки
  /*Функция Strike разбития строки в массив строк-букв  с учетом дифтонгов
   возвращает  массив строк-букв, в том числе и двойных, из которых
   состоит исходная строка
*/
  function Strike(ss) {
    //если строка короче, чем дифтонг, то анализ опускается 
    var s = [];
    if (ss.length < 2)  {
        if (ss.length == 1)  {
            s.push (ss);
        }
        return s;
    }
    pred = ss.charAt(0);
    for (var i = 1; i < ss.length; i++){
         var tek = ss.charAt(i);
         var para = pred + tek;
         if (IsDblt(para) === true)  {
             s.push(para);
             if (i === ss.length - 1){
                return s;
             } else {
                 pred = ss.charAt(i+1);
                 i++;
                 if (i === ss.length - 1){
                 	s.push(pred);
                 	return s;
                 }
             }
         } else {
             s.push (pred);
             if (i === ss.length - 1){
             	s.push (tek);
             	return s;
             }
             pred = tek;
         }
     }
     return s;
  }

  // Определяем, строка из двух символов это дифтонг или нет 
  function IsDblt(s){
	    if (s.length !== 2) {
	        return false;
	    }
	    // Задание дифтонгов - двойных букв 
	    var x = Alphabet();
	    for (var j = 0; j < x.length; j++){
	        if (x[j] == s.toUpperCase()) {
	            return true;
	        }
	    }
	    return false;
  }
  /**/
  //соравнеие строк по порядку следования символов в алфавите
  //string1, string2 - массивы срок-букв, в т.ч. двойных
  function CompareChainesByAlphabet(string1, string2){
  	var len1 = string1.length;
  	var len2 = string2.length;
  	if (len1 == 0 && len2 == 0) {
  		return 0;
  	}
  	if (len1 == 0) {
  		return -1;
  	} 
  	if (len2 == 0) {
  		return 1;
  	}
  	var i = 0;
  	var rez = 0;
  	do {
  		letter1 = string1[i];
  		letter2 = string2[i];
  		rez = CompareLettersByAlphabet(letter1, letter2);
  		i++;
  	}while (rez == 0 && i < string1.length  && i < string2.length); 
  	if (rez != 0) {
  		return rez;
  	}
  	return string1.length - string2.length;
  }
   
  //соравнеие букв по порядку следования в алфавите
  function CompareLettersByAlphabet(letter1, letter2) {
  	var ord1 = OrderOfLetterInAlphabet(letter1);
  	if (ord1 < 0) {
  	   return 0;
  	}
  	var ord2 = OrderOfLetterInAlphabet(letter2);
  	if (ord2 < 0) {
  	   return 0;
  	}
  	return ord1-ord2;
  }
 
  //порядковый номер буквы в алфавите
  function OrderOfLetterInAlphabet(letter){
	  if (typeof(letter) !==  "string") {
	  	return -1; // тип не string
	  } 
	  if (letter.length == 0 || letter.length >2) {
	  	return -2; // неправильная длина
	  }
	  var x = Alphabet();
	  var i = 0;
	  for (i = 0; i < x.length; i++) {
	  	if (x[i] === letter.toUpperCase()){
	  		return i + 1;	
	  	}
  	  }
  	  // не буква алфавита
  	  if (AlphabetPriority == true){
  	  	return x.length + 1; 
  	  }
  	  else {
  	  	 return 0;
  	  } 
  }