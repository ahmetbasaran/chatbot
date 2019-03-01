const fs = require('fs-extra');
const concat = require('concat');
const path = './dist/icp-frontend/';
const regex = /[0-9]+.js/;

(async function build() {

	const files = [
		'./dist/icp-frontend/runtime.js',
		'./dist/icp-frontend/polyfills.js',
		'./dist/icp-frontend/scripts.js',
		'./dist/icp-frontend/main.js',
		'./dist/icp-frontend/common.js',
	];

	const filesToRemove = [
		'./dist/icp-frontend/runtime.js',
		'./dist/icp-frontend/polyfills.js',
		'./dist/icp-frontend/main.js',
		'./dist/icp-frontend/common.js',
		'./dist/icp-frontend/favicon.ico',
		'./dist/icp-frontend/index.html',
		'./dist/icp-frontend/scripts.js',
	];

	await fs.readdir(path, function (err, filesInDir) {
		filesInDir.forEach(file => {
			if (file.match(regex)) {
				files.push(path + file);
				filesToRemove.push(path + file);
			}
		});
	});

	var crypto = require('crypto');
	var dateHash = crypto.createHash('md5').update(Date.UTC.toString()).digest("hex");
	console.log(dateHash);
	await concat(files, path + 'icp-frontend.' + dateHash + '.js')
		.then(res => {
			console.log('combined files');
		});


	await fs.copy('./dist/icp-frontend/styles.css', './dist/icp-frontend/icpStyles.' + dateHash + '.css')
		.then(() => {
			console.log('renamed css file');
		});

	await fs.remove('./dist/icp-frontend/styles.css');

	filesToRemove.forEach(function (file) {
		fs.remove(file);
	});
	console.log('cleaned up dist folder');
})();
