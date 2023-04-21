// ローディング

// eachTextAnimeにappeartextというクラス名をつける定義
function EachTextAnimeControl() {
	$('.eachTextAnime').each(function() {
		let elemPos = $(this).offset().top - 50;
		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();
		if(scroll >= elemPos - windowHeight) {
			$(this).addClass("appeartext");
		}else {
			$(this).removeClass("appeartext");
		}
	});
}

//上に戻るボタンを表示させる関数
function PageTopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 200){//上から200pxスクロールしたら
		$('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	}else{
		if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
			$('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}
// TextRandomAnimeにappearRandomtextというクラス名を付ける定義
function TextRandomAnimeControl() {
	$('.TextRandomAnime').each(function () {
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass("appearRandomtext");

		} else {
			$(this).removeClass("appearRandomtext");
		}
	});
}
// fadeUpTriggerにfadeUpクラスをつける
function fadeAnime(){
	$('.fadeUpTrigger').each(function(){
		let elemPos = $(this).offset().top-10;
		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('fadeUp');
		}
	});
}

// blurTriggerにblurクラスをつける
function blurAnime(){
	$('.blurTrigger').each(function(){
		let elemPos = $(this).offset().top-10;
		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('blur');
		}
	})
}
// bgLRextendRTriggerにbgLRextendクラスをつける/bgappearTriggerにbgapperクラスをつける
function BgFadeAnime(){
	// 背景色を伸ばす
	$('.bgLRextendTrigger').each(function(){ //bgLRextendTriggerというクラス名が
		let elemPos = $(this).offset().top-50;//要素より、50px上の
		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
		}
	});	
	// 文字を出す
	$('.bgappearTrigger').each(function(){ //bgappearTriggerというクラス名が
		let elemPos = $(this).offset().top-50;//要素より、50px上の
		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
		}
	});	
}

// 画面が読み込まれたらすぐ動かす
$(window).on('load', function(){
	$("#splash_logo").delay(1250).fadeOut('slow'); // ローディングマークをフェードアウト
	$("#splash").delay(1400).fadeOut('slow', function(){ // ローディングエリアをフェードアウト
		$('body').addClass('appear'); // フェードアウト後、body に appear クラスを付与
		
		// テキストが1文字ずつ出現
		let element = $(".eachTextAnime");
		element.each(function() {
			let text = $(this).text();
			let textbox = "";
			text.split('').forEach(function(t,i) {
				if(t !== " ") {
					if(i < 10) {
						textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
					}else {
						let n = i/10;
						textbox += '<span style="animation-delay:.' + n + 's;">' + t + '</span>';
					}
				}else {
					textbox += t;
				}
			});
			$(this).html(textbox);
		});
		EachTextAnimeControl();
		PageTopAnime();
	});
	let element = $(".TextRandomAnime");
	element.each(function () {
		let text = $(this).text();
		let textbox = '';
		text.split('').forEach(function (t) {
			textbox += '<span>' + t + '</span>';
		});
		$(this).html(textbox);
	});
	TextRandomAnimeControl();
	let grid = new Muuri('.grid', {
		//アイテムの表示速度※オプション。入れなくても動作します
		showDuration: 600,
		showEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
		hideDuration: 600,
		hideEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
		
		// アイテムの表示/非表示状態のスタイル※オプション。入れなくても動作します
		visibleStyles: {
			opacity: '1',transform: 'scale(1)'
		},hiddenStyles: {
			opacity: '0',transform: 'scale(0.5)'
		}    
	});
	//＝＝＝並び替えボタン設定
	$('.sort-btn li').on('click',function(){			//並び替えボタンをクリックしたら
		$(".sort-btn .active").removeClass("active");	//並び替えボタンに付与されているactiveクラスを全て取り除き
		let className = $(this).attr("class");			//クラス名を取得
		className = className.split(' ');				//「sortXX active」のクラス名を分割して配列にする
		$("."+className[0]).addClass("active");			//並び替えボタンに付与されているクラス名とギャラリー内のリストのクラス名が同じボタンにactiveクラスを付与
		if(className[0] == "sort00"){						//クラス名がsort00（全て）のボタンの場合は、
			grid.show('');								//全ての要素を出す
		}else{											//それ以外の場合は
			grid.filter("."+className[0]); 				//フィルターを実行
		}
	});
	//＝＝＝ Fancyboxの設定
	$('[data-fancybox]').fancybox({thumbs: {
    autoStart: true,},
    });
});

// 画面遷移終了後
$('.splashbg').on('animationend', function() {
});

// 画面をスクロールしたら動かす
$(window).scroll(function() {
	EachTextAnimeControl();
	TextRandomAnimeControl();
	fadeAnime();
	blurAnime();BgFadeAnime();
	PageTopAnime();
});

// #g-navをクリックした際の設定
$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

$('.slider').slick({
		autoplay: true,//自動的に動き出すか。初期値はfalse。
		infinite: true,//スライドをループさせるかどうか。初期値はtrue。
		speed: 500,//スライドのスピード。初期値は300。
		slidesToShow: 3,//スライドを画面に3枚見せる
		slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
		prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
		nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
		centerMode: true,//要素を中央ぞろえにする
		variableWidth: true,//幅の違う画像の高さを揃えて表示
		dots: true,//下部ドットナビゲーションの表示
});
