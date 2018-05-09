'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		
		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: 'www',
						prefix: 'myAppName',
						src: [
							'**/*.js',
							'**/*.fragment.html',
							'**/*.fragment.json',
							'**/*.fragment.xml',
							'**/*.view.html',
							'**/*.view.json',
							'**/*.view.xml',
							'**/*.properties',
							'manifest.json',
							'!test/**'
						]
					},
					dest: 'www'
				},
				components: true
			}
		},
		/* 
		clean: {
			dist: 'dist',
			coverage: 'coverage'
		}, 

		 copy: {
			dist: {
				files: [ {
					expand: true,
					cwd: 'webapp',
					src: [
						'**',
						'!test/**'
					],
					dest: 'dist'
				} ]
			}
		},	 
		*/	

	});
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	//grunt.loadNpmTasks('grunt-contrib-clean');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.registerTask('build', ['openui5_preload']);
	

};
