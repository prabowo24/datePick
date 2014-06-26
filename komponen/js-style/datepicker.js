/*

Patranto Bagus Prabowo - floorvest@gmail.com
Just training make a plugin, hope you like it. :)

i'm still learning, so please teach me. sorry if my english very bad :).

be careful, spagheti code :D  
*/
(function($){
	
	$.fn.datePick = function(options){
		
		var elem = this;
		var elem2 = $(this);
		
		$(this).attr('readonly',true);
		
		
		var setting = $.extend({
			type:1,
			separator:'/'
		},options);
		
		var p = false;
		
		var date=new Date();
		var currentMonth = date.getUTCMonth()+1;
		var currentYear = date.getUTCFullYear();
		
		function reset_time(){
			currentMonth = date.getUTCMonth()+1;
			currentYear = date.getUTCFullYear();
		};
		
		var lim = "tag"
		
		var tabel = "<table border='0' width='100%'>\
		<tr>\
			<th colspan=1><button data-arrow='left'>&#8656;</button></th>\
			<th colspan=5 id='judul-bulan'>Juny 2014</th>\
			<th colspan=1><button data-arrow='right'>&#8658;</button></th>\
		</tr>\
		<tr>\
			<th>Su</th>\
			<th>Mo</th>\
			<th>Tu</th>\
			<th>We</th>\
			<th>Th</th>\
			<th>Fr</th>\
			<th>Sa</th>\
		</tr>\
		<tr>\
			<td id ='data0-1'>&nbsp;</td>\
			<td id ='data1-1'>&nbsp;</td>\
			<td id ='data2-1'>&nbsp;</td>\
			<td id ='data3-1'>&nbsp;</td>\
			<td id ='data4-1'>&nbsp;</td>\
			<td id ='data5-1'>&nbsp;</td>\
			<td id ='data6-1'>&nbsp;</td>\
		</tr>\
		<tr>\
			<td id ='data0-2'>&nbsp;</td>\
			<td id ='data1-2'>&nbsp;</td>\
			<td id ='data2-2'>&nbsp;</td>\
			<td id ='data3-2'>&nbsp;</td>\
			<td id ='data4-2'>&nbsp;</td>\
			<td id ='data5-2'>&nbsp;</td>\
			<td id ='data6-2'>&nbsp;</td>\
		</tr>\
		<tr>\
			<td id ='data0-3'>&nbsp;</td>\
			<td id ='data1-3'>&nbsp;</td>\
			<td id ='data2-3'>&nbsp;</td>\
			<td id ='data3-3'>&nbsp;</td>\
			<td id ='data4-3'>&nbsp;</td>\
			<td id ='data5-3'>&nbsp;</td>\
			<td id ='data6-3'>&nbsp;</td>\
		</tr>\
		<tr>\
			<td id ='data0-4'>&nbsp;</td>\
			<td id ='data1-4'>&nbsp;</td>\
			<td id ='data2-4'>&nbsp;</td>\
			<td id ='data3-4'>&nbsp;</td>\
			<td id ='data4-4'>&nbsp;</td>\
			<td id ='data5-4'>&nbsp;</td>\
			<td id ='data6-4'>&nbsp;</td>\
		</tr>\
		<tr style='display:none' id='row5'>\
			<td id ='data0-5'>&nbsp;</td>\
			<td id ='data1-5'>&nbsp;</td>\
			<td id ='data2-5'>&nbsp;</td>\
			<td id ='data3-5'>&nbsp;</td>\
			<td id ='data4-5'>&nbsp;</td>\
			<td id ='data5-5'>&nbsp;</td>\
			<td id ='data6-5'>&nbsp;</td>\
		</tr>\
		<tr style='display:none' id='row6'>\
			<td id ='data0-6'>&nbsp;</td>\
			<td id ='data1-6'>&nbsp;</td>\
			<td id ='data2-6'>&nbsp;</td>\
			<td id ='data3-6'>&nbsp;</td>\
			<td id ='data4-6'>&nbsp;</td>\
			<td id ='data5-6'>&nbsp;</td>\
			<td id ='data6-6'>&nbsp;</td>\
		</tr>\
		</table>";
		
		var div = '<div id="'+lim+'">'+tabel+'</div>';
		
		var posisi = elem.position();
		
		var mainData = $('#'+lim);
		
		$("body").prepend(div);
		
		
		$("#"+lim).css({
			display:'none',
			//border:'1px solid #000',
			position:'fixed',
			width:350,
			height:290,
			fontFamily:'"Arial Black", Gadget, sans-serif'
		});
		
		
		var kanan = $(window).width() - posisi.left - elem2.width()-6;
		var bawah = $(window).height() - posisi.top - elem2.height();
		var kiri  = posisi.left+2;
		var atas = posisi.top;
		
		if(kanan < $("#"+lim).width()){
			$("#"+lim).css('right',kanan);
		}else{
			$("#"+lim).css('left',kiri);
		}
		
		if(bawah < $("#"+lim).height()){
			$("#"+lim).css('bottom',bawah+elem.height()*1);
		
		}else{
			$("#"+lim).css('top',atas+elem.height()*2);
		}
		
		
		$("#"+lim+" table").css({
			"border-collapse":'collapse'
		});
		$("#"+lim).css({
			background:"#DD4B39"
		});
		
		
		$("#"+lim+" table tr td ").css({
			textAlign:'center',
			padding:"10px 5px",
			background:"#DD4b39",
			fontSize:'14px'
		});
		
		$("#"+lim+" table th").css({
			textAlign:'center',
			padding:"10px",
			background:"#DD4B39",
			color:"#fff",
			fontSize:'14px'
		});
		$("#"+lim+" table th button").css({
			color:"#fff",
			textDecoration:'none',
			border:'none',
			background:'none',
			outline:'none',
			cursor:'pointer'
		});
		
		$(document).mouseup(function(e){
			var con = $('#'+lim);
			if(elem.is(e.target)){
				return false;
			}
			if(!con.is(e.target) && con.has(e.target).length === 0){
				con.fadeOut();
			}
			
		});
		
		$("#"+lim+"").find('button').click(function(){
			var t =$(this).attr('data-arrow');
			
			if(t == 'right'){
				if(currentMonth == 12){
					currentMonth = 1;
					currentYear +=1;
				}else{
					currentMonth +=1;
				}
			}else if(t == 'left'){
				if(currentMonth == 1){
					currentMonth = 12;
					currentYear -=1;
				}else{
					currentMonth -=1;
				}
			}
			
			olah_data(currentMonth,currentYear);
		});
		
		function hapus(){
			$("#"+lim).find('table').find('td').each(function(e){
				$(this).html('&nbsp;');
				$(this).css('background',"#DD4b39");
			});
		};
		
		//start
		$(this).focus(function(){
			
			reset_time();
			olah_data(currentMonth,currentYear);
			$("#"+lim).fadeIn();
			
		});
		
		
		function debug(data){
			$("#debug").append(data+"<bR>");
		};
		
		function hitung_hari(month,year){
			return new Date(year, month, 0).getDate();
		};
		
		function cek_hari_awal(day,month,year){
			var bulan = ['January','February','March','April','May','Juny','July','August','September','October','November','December'];
			
			$("#judul-bulan").html(bulan[month-1] + ' ' + year);
			
			var stringDate = bulan[month-1] + ' ' + day +', ' +year +' 12:00:00';
			
			var d = new Date(stringDate);
			
			return d.getDay();
		};
		
		function olah_data(month,year){
			hapus();
			var t = hitung_hari(month,year);
			var row = 1;
			for(var i = 1;i <= t;i++){
				var x = cek_hari_awal(i,month,year);
				
				if(row>4){
					$("#row5").show();
				}else{
					$("#row5").hide();
				}
				
				if(row>5){
					$("#row6").show();
				}else{
					$("#row6").hide();
				}
				
				var n = "#data"+(x)+'-'+row;
				
				//debug(n);
				
				$(n).html("<a href='#'>"+i+"</a>"); 
				$(n).css({
					background:"#DD4B39"
				});
				$(n).find('a').css({
					color:"#fff",
					textDecoration:'none',
					padding:'5px',
					margin:'5px'
				});
				$(n).find('a').hover(function(e){
					$(this).css("background-color",e.type === "mouseenter"?"#777":"#DD4B39");
				});
				$(n).find('a').click(function(e){
					e.preventDefault();
					if(setting.type==1){
						var total = $(this).html()+setting.separator+month+setting.separator+year;
					}else if(setting.type==2){
						var total = year+setting.separator+month+setting.separator+$(this).html();
					}else{
					
						var total = $(this).html()+setting.separator+month+setting.separator+year;
						
					}
					elem.val(total);
					$("#"+lim).fadeOut();
				});
				if(x==6) {
					row++;
				}
			
			}
		};
	};

}(jQuery));