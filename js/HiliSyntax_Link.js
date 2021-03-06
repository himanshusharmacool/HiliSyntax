//**********************************************************************\\
//														 				\\
//		Author: Himanshu Sharma 						 				\\
//				himanshusharma2972@gmail.com 			 				\\

//				github.com/himanshuthecoder				 				\\
//														 				\\
//		About : It is a simple Syntax Higlighlighter 	 				\\
//				that you can use to Highlight syntax 	 				\\
//				in your blog or website.				 				\\
//				Read the Readme for more Info.			 				\\
//													 					\\
//**********************************************************************\\


/********* defining highlighted word *******************/
var keywords = "System|do|for|while|switch|break|continue|endl|if|else|return|try|true|false|";
	keywords +="import|#include|namespace|case|default|auto|sizeof|static|this|throws|throws|";
	keywords +="null|static|public|private|protected|friend|package|new|interface|goto|extends|catch|const|boolean|virtual";

var datatypes = "(int|float|char|double|long|string|void|var|class|struct|union)";
var sentence = "(\".+?\")|(\'.+?\')";
var comments = "((\/\/.+))|(\/\\*[\\S\\s]+?\\*\/)";
var funname = "((\\w+(?=[\\(])))";
var EXP_JOINER  = '|';


/******* compiling patterns ************/
var KEYWORD_REGEX = new RegExp(keywords);
var SENTENCE_REGEX = new RegExp(sentence);
var COMMENTS_REGEX = new RegExp(comments);
var FUNNAME_REGEX = new RegExp(funname);
var DATATYPES_REGEX = new RegExp(datatypes);

/******** combining all patterns  ********/
var EXP_ALL = '';

EXP_ALL = EXP_ALL + comments + EXP_JOINER;
EXP_ALL = EXP_ALL + sentence  + EXP_JOINER;
EXP_ALL = EXP_ALL + funname  + EXP_JOINER;
EXP_ALL = EXP_ALL + datatypes + EXP_JOINER;
EXP_ALL = EXP_ALL + keywords;


/********* Storing Color Code *************/
var Comment_Color = null;
var DataType_Color = null;
var Sentence_Color = null;
var Keyword_Color = null;
var Funname_Color = null;
var Background_Color = null;

/*******  Creating Array Of Color For Different Theme Purpose   *******/

	var ColorCodeCollection = [];	//Store Colors Of Different Type of Tags

	// Array no is converted into meaningful name
	var Background_Color_No = 0;
	var Font_Color_No = 1;
	var Comment_Color_No = 2;
	var DataType_Color_No = 3;
	var Sentence_Color_No = 4;
	var Keyword_Color_No = 5;
	var Funname_Color_No = 6;



var START_MATCHPOINTS = [];  //This is used to store the starting index of matched pattern
var END_MATCHPOINTS = [];	 //This is used to store the last index of matched pattern





//main function started
function highlighter(ThemeClassName,ColorCodeCollection)
{
	//console.log(ColorCodeCollection);
	//	Adding Color According To Theme
	Background_Color = ColorCodeCollection[Background_Color_No];
	Font_Color = ColorCodeCollection[Font_Color_No];
	Comment_Color = ColorCodeCollection[Comment_Color_No];
	DataType_Color = ColorCodeCollection[DataType_Color_No];
	Sentence_Color = ColorCodeCollection[Sentence_Color_No];
	Keyword_Color = ColorCodeCollection[Keyword_Color_No];
	Funname_Color = ColorCodeCollection[Funname_Color_No];


	var obj=null;	//This is used to store the collection of blare_synhighlighter class
	var formattedText="";	//This is used to store the highlighted text
	var highlightedContent=[];			//This will store content of each class


	//Getting Syntax Highlighter  classes in obj
	obj=document.getElementsByClassName(ThemeClassName);

	//console.log(obj.length);

	//compiling all pattern  at once
	var EXPRESSION = new RegExp(EXP_ALL,'g');

	//Processing each class for highlighting
	for(n=0;n<obj.length;n++)
	{
		obj[n].style.background=Background_Color;
		obj[n].style.color = Font_Color;
		//getting content of class
		highlightedContent[n] = obj[n].textContent;
		//highlightedContent[n] = highlightedContent[n].replace(/</g,"&lt;");
		//highlightedContent[n] = highlightedContent[n].replace(/>/g,"&gt;");
		//collecting location of matched pattern in highlightedContent
		while((match = EXPRESSION.exec(obj[n].textContent))!==null)
		{

			START_MATCHPOINTS.push(match.index);
			END_MATCHPOINTS.push(EXPRESSION.lastIndex);

		}

		//adding syntax highlighter
		for(var i = (START_MATCHPOINTS.length-1);i>=0;i--)
		{
			var content = highlightedContent[n].substring(START_MATCHPOINTS[i],END_MATCHPOINTS[i]);

			//console.log(content);

			if(COMMENTS_REGEX.test(content))
			{
				formattedText = '<span style=\"color:'+Comment_Color+'\"  >'+content+'</span>';
			}
			else if(SENTENCE_REGEX.test(content))
			{

				formattedText= '<span style=\"color:'+Sentence_Color+'\"  >'+content+'</span>';

			}
			else if(KEYWORD_REGEX.test(content))
			{
				formattedText = '<span style=\"color:'+Keyword_Color+'\"  >'+content+'</span>';

			}
			else if(DATATYPES_REGEX.test(content))
			{
				formattedText = '<span style=\"color:'+DataType_Color+'\"  >'+content+'</span>'
			}
			else
			{
				//function highlighter
				formattedText = '<span style=\"color:'+Funname_Color+'\"  >'+content+'</span>';
			}

			//console.log(formattedText)
			//changing original text with formatted text in highlightedContent
			highlightedContent[n] = highlightedContent[n].substring(0,START_MATCHPOINTS[i])+formattedText+highlightedContent[n].substring(END_MATCHPOINTS[i]);
		}

		//console.log(highlightedContent[0]);

		//adding line numbers to highlightedContent
		var tmp = highlightedContent[n];
		var linenum = "<ol>\n";
		var NEW_LINE = new RegExp(".+\n",'g');
		while((match = NEW_LINE.exec(tmp))!==null)
		{
			linenum = linenum + '<li>' + tmp.substring(match.index,NEW_LINE.lastIndex)+'</li>'+'\n';
		}
		linenum = linenum + '</ol>';

		//console.log(linenum);
		highlightedContent[n]=linenum;

		//changing original content of class with new content
		obj[n].innerHTML=highlightedContent[n];

		//reinitializing start and end points
		START_MATCHPOINTS = [];
		END_MATCHPOINTS = [];
	}



}




function SetTheme()
{



	var DarkThemeClassFlag = 0;
	var LightThemeCLassFlag = 0;



	var highlightingClasses = document.getElementsByTagName('pre');

	for(var i=0;i<highlightingClasses.length;i++)
	{
		//console.log(highlightingClasses[i].classList.contains('HiliSyntax_Dark'));
		if(highlightingClasses[i].classList.contains('HiliSyntax_Dark'))
			DarkThemeClassFlag = 1;

		if(highlightingClasses[i].classList.contains('HiliSyntax_Light'))
			LightThemeCLassFlag = 1;

	}


	if(DarkThemeClassFlag == 1)
	{
		ColorCodeCollection[Background_Color_No] = 'rgb(45,45,45)';
		ColorCodeCollection[Font_Color_No] =  'rgb(204,204,194)';
		ColorCodeCollection[Comment_Color_No] =  'rgb(153,153,126)';
		ColorCodeCollection[DataType_Color_No] =  'rgb(240,141,68)';
		ColorCodeCollection[Sentence_Color_No] =  'rgb(115,164,119)';
		ColorCodeCollection[Keyword_Color_No] =  'rgb(226,105,73)';
		ColorCodeCollection[Funname_Color_No] =  'rgb(134,221,44)';


		highlighter('HiliSyntax_Dark',ColorCodeCollection);

	}

	if(LightThemeCLassFlag == 1)
	{
		ColorCodeCollection[Background_Color_No] = 'rgb(245,242,240)';
		ColorCodeCollection[Font_Color_No] =  'rgb(0,0,0)';
		ColorCodeCollection[Comment_Color_No] =  'rgb(154,153,166)';
		ColorCodeCollection[DataType_Color_No] =  'rgb(31,185,229)';
		ColorCodeCollection[Sentence_Color_No] =  'rgb(102,153,15)';
		ColorCodeCollection[Keyword_Color_No] =  'rgb(162,39,132)';
		ColorCodeCollection[Funname_Color_No] =  'rgb(231,90,104)';

		highlighter('HiliSyntax_Light',ColorCodeCollection);
	}

}




//main function
function main()
{
	SetTheme();
}

//call to main function  after page is fully loaded
window.onload = function(){main()}
//alert("heelo");