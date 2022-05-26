const C = document.querySelector('canvas'),
	$ = C.getContext('2d'),
	W = (C.width = innerWidth),
	H = (C.height = innerHeight);

const str = 'А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я',
	matrix = str.split('');

let font = 10,
	// кількість колонок = ширина холста / розмір шрифта
	col = W / font,
	arr = [];

for (let i = 0; i < col; i++) arr[i] = 1;

function draw() {
	// визначаємо колір фону
	// такой колір дозволяє добиться эффекту поступового затухания символів
	$.fillStyle = 'rgba(0, 0, 0, .05)';

	// заливаєм холст вибраним коліром
	$.fillRect(0, 0, W, H);

	// міняем колір для шрифта
	$.fillStyle = '#0f0';

	// устанавлюєм параметри шрифта
	$.font = font + 'px system-ui';

	// малюєм символи
	for (let i = 0; i < arr.length; i++) {
		// вибираєм випадковий набір символів
		let txt = matrix[Math.floor(Math.random() * matrix.length)];

		// малюєм символи
		// рухаємось вправо и вниз
		// fillText(набір символів, координата x = значення i, помножене на размір шрифта, координата y = значення arr, помножене на размір шрифта)
		$.fillText(txt, i * font, arr[i] * font);

		// якщо "y" більше висоти холста або Math.random() видає більше 0.975 (чим це значення меньше, тем більше буде пустот на екрані), то піднімаємся наверх (обнуляєм "y")
		// це позволяє забезпечити різницю відмальовування окремих колонок
		if (arr[i] * font > H && Math.random() > 0.975) arr[i] = 0;

		// збільшуєм значення y
		arr[i]++;
	}
}

setInterval(draw, 123);

window.addEventListener('resize', () => location.reload());
