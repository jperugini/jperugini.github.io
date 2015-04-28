(function () {

	angular
		.module('demo', ['finderTree'])
		.controller('DemoCtrl', DemoCtrl);

	function DemoCtrl() {

		/* jshint validthis: true */
		var vm = this;
		
		vm.testSelect = {}
		vm.testSelect.itemNumber = 4;

		vm.test = {
			'dirs': [
				{
					'name': 'Hello',
					'dirs': [{
							'name': 'Hello/sub',
							'dirs': [{
								'name': 'Hello/sub',
								'dirs': [],
								'files': [{
									'name': 'Hello/Sub1'
								}]
						}],
							'files': [{
								'name': 'Hello/Sub1'
							}]
						},
						{
							'name': 'Hello/sub',
							'dirs': [],
							'files': [{
								'name': 'Very very very long Hello/Sub2'
							}]
						}],
					'files': [{
						'name': 'Hello/1'
					}, {
						'name': 'Hello/2'
					}]
				}, {
					'name': 'Test',
					'dirs': [],
					'files': [{
						'name': 'Test/1'
					}, {
						'name': 'Test/2'
					}]
				},
				{
					'name': 'Very very very long Hello',
					'dirs': [{
						'name': 'Hello/sub',
						'dirs': [],
						'files': [{
							'name': 'Hello/Sub1'
						}]
						}],
					'files': [{
						'name': 'Hello/1'
					}]
				}
			],
			'files': [{
				'name': 'Hello/Sub1'
			}]
		};
	}

})();