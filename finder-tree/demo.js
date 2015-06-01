(function () {

	angular
		.module('demo', ['finderTree', 'ngDialog'])
		.controller('DemoCtrl', DemoCtrl);

	DemoCtrl.$inject = ['ngDialog'];

	function DemoCtrl(ngDialog) {

		/* jshint validthis: true */
		var vm = this;

		vm.testSelect = {};
		vm.tpltestSelect = {};
		vm.testSelect.itemNumber = 4;

		vm.selectFolder = selectFolder;

		vm.breadcrumbMove = breadcrumbMove;

		vm.newFolder = newFolder;
		vm.newFile = newFile;

		vm.hardDrive = {
			'name': 'Hard Drive',
			'dirs': [
				{
					'name': 'etc',
					'dirs': [{
							'name': 'Long subdirectory',
							'dirs': [{
								'name': 'sub',
								'dirs': [],
								'files': [{
									'name': 'long_file_in_sub.txt'
								}]
						}],
							'files': [{
								'name': 'Hello/Sub1'
							}]
						},
						{
							'name': 'init.d',
							'dirs': [],
							'files': [{
								'name': 'service'
							}]
						}],
					'files': [{
						'name': 'file1.txt'
					}, {
						'name': 'file2.txt'
					}]
				}, {
					'name': 'files',
					'dirs': [],
					'files': [{
						'name': 'config.xml'
					}, {
						'name': 'server.xml'
					}]
				},
				{
					'name': 'var',
					'dirs': [{
						'name': 'lib',
						'dirs': [],
						'files': [{
							'name': 'lib.jar'
						}]
						}],
					'files': [{
						'name': 'log.xml'
					}]
				}
			],
			'files': [{
				'name': 'log.txt'
			}]
		};

		vm.hd = angular.copy(vm.hardDrive);

		vm.homeFolder = {
			'name': 'Home',
			'dirs': [
				{
					'name': 'Documents',
					'dirs': [{
							'name': 'eclipse',
							'dirs': [{
								'name': 'plugins',
								'dirs': [],
								'files': [{
									'name': 'plugin'
								}]
						}],
							'files': [{
								'name': 'Hello/Sub1'
							}]
						},
						{
							'name': 'reports',
							'dirs': [],
							'files': [{
								'name': 'report_finder_tree.pdf'
							}]
						}],
					'files': [{
						'name': 'dis.tar.gz'
					}, {
						'name': 'test.doc'
					}]
				}, {
					'name': 'Pictures',
					'dirs': [],
					'files': [{
						'name': 'chat.jpg'
					}, {
						'name': 'test.png'
					}]
				},
				{
					'name': 'Videos',
					'dirs': [{
						'name': 'Movies',
						'dirs': [],
						'files': [{
							'name': 'mov.mp4'
						}]
						}],
					'files': [{
						'name': 'tree.mov'
					}]
				},
				{
					'name': 'finder-tree',
					'dirs': [{
						'name': 'demo',
						'dirs': [],
						'files': [{
							'name': 'lib.js'
						}]
						}],
					'files': [{
						'name': 'index.html'
					}]
				}
			],
			'files': [{
				'name': 'home-script.sh'
			}]
		};

		vm.listFolder = [{
			'name': "Hard Drive",
			'img': "img/hd.png",
			'numberItem': 4,
			'structure': vm.hardDrive
		}, {
			'name': "Home",
			'img': "img/home.png",
			'numberItem': 5,
			'structure': vm.homeFolder
		}];

		function selectFolder(folder) {
			angular.forEach(vm.listFolder, function (fol) {
				fol.active = undefined;
			});
			folder.active = true;
			vm.tpltestSelect = {};
			vm.selectedFolder = folder;
			vm.tpltestSelect.itemNumber = folder.numberItem;
			vm.tpltestSelect.path = [];
			vm.tpltestSelect.path.push(folder.name);
		};

		selectFolder(vm.listFolder[0]);

		function breadcrumbMove(index) {
			vm.tpltestSelect.manual = true;
			if (angular.isDefined(vm.tpltestSelect.path)) {
				for (var i = vm.tpltestSelect.path.length; i > index; i--) {
					vm.tpltestSelect.path.splice(i, 1);
				}
			}
		};

		function newFolder() {
			openModal(0);
		};

		function newFile() {
			openModal(1);
		};

		function openModal(type) {
			var text;
			var isFolder;
			switch (type) {
			case 0:
				text = 'New Folder';
				isFolder = true;
				break;
			case 1:
				text = 'New File';
				isFolder = false;
				break;
			case 2:
				text = 'Rename';
				break;
			case 3:
				text = 'Delete';
				break;
			default:
				text = 'Error';
				break;
			}
			ngDialog.openConfirm({
				template: 'modalDialogId',
				className: 'ngdialog-theme-default',
				data: {
					type: text
				}
			}).then(function (value) {
				var path = vm.tpltestSelect.path.slice();
				path.shift();
				stepTpPathToCreateItem(vm.selectedFolder.structure, path, value, isFolder, true);
			}, function (reason) {
				// console.log('Modal promise rejected. Reason: ', reason);
			});
		}

		function stepTpPathToCreateItem(data, path, name, isFolder, createItem) {
			if (angular.isDefined(path) && path.length > 0) {
				angular.forEach(data.dirs, function (dir) {
					if (dir.name === path[0]) {
						path.shift();
						if (path.length === 0 && createItem) {
							addItem(dir, name, isFolder);
							createItem = false;
						}
						stepTpPathToCreateItem(dir, path, name, isFolder, createItem);
					}
				});
			} else {
				if (createItem) {
					addItem(data, name, isFolder);
				}
			}
		};

		function addItem(data, name, isFolder) {
			if (isFolder) {
				data.dirs.push({
					name: name,
					dirs: [],
					files: []
				});
			} else {
				data.files.push({
					name: name
				});
			}
		};

	}

})();