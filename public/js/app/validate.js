
require([
	'jquery',
	'bootstrap',
	'bootstrapValidator',
	'bootstrapSelect'
	], function ($, Bootstrap, BootstrapValidator, BootstrapSelect) {

		/* ---------------------------------------------------------
		 * Add New User and Player
		 */
		+function () {
			'use strict';

			$('#playerForm')
		        .find('[name="position"]')
		            .selectpicker()
		            .change(function(e) {
		                // revalidate the language when it is changed
		                $('#bootstrapSelectForm').bootstrapValidator('revalidateField', 'position');
		            })
		            .end()
		        .find('[name="squadNumber"]')
		            .selectpicker()
		            .change(function(e) {
		                // revalidate the language when it is changed
		                $('#bootstrapSelectForm').bootstrapValidator('revalidateField', 'squadNumber');
		            })
		            .end()
				.bootstrapValidator({
					// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
					live : 'submitted',
		            excluded: ':disabled',
					feedbackIcons: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
						lastName: {
							feedbackIcons: 'false',
							// message: 'The username is not valid',
							validators: {
								notEmpty: {
									message: '성을 적어주세요.'
								},
								stringLength: {
									// min: 6,
									max: 20,
									message: '너무 길어요.'
								},
								regexp: {
									regexp: /^[ㄱ-ㅎ가-힣]+$/,
									message: '한글로 입력해주세요.'
								}
							}
						},
						firstName: {
							feedbackIcons: 'false',
							// message: 'The username is not valid',
							validators: {
								notEmpty: {
									message: '이름을 적어 주세요.'
								},
								stringLength: {
									// min: 6,
									max: 20,
									message: '너무 길어요.'
								},
								regexp: {
									regexp: /^[ㄱ-ㅎ가-힣]+$/,
									message: '한글로 입력해주세요.'
								}
							}
						},
						email: {
							feedbackIcons: 'false',
							validators: {
								notEmpty: {
									message: '이메일을 적어주세요.'
								},
								emailAddress: {
									message: '이메일 형식에 맞게 적어주세요.'
								}
							}
						},
						birthday: {
							feedbackIcons: 'false',
							validators: {
								notEmpty: {
									message: '생일을 입력해 주세요.'
								},
								date: {
									format: 'YYYY/MM/DD',
									message: '형식에 맞게 입력해 주세요.'
								}
							}
						},
		                position: {
		                    feedbackIcons: 'false',
		                    validators: {
		                        notEmpty: {
		                            message: '포지션을 선택해야합니다.'
		                        }
		                    }
		                },
		                squadNumber: {
		                    feedbackIcons: 'false',
		                    validators: {
		                        notEmpty: {
		                            message: '등번호를 선택해야합니다.'
		                        }
		                    }
		                }
					}
				})
			    .on('success.form.bv', function(e) {
			        // Prevent form submission
			        e.preventDefault();

			        // Get the form instance
			        var $form = $(e.target);

			        // Get the BootstrapValidator instance
			        var bv = $form.data('bootstrapValidator');

			        // Use Ajax to submit form data
			        $.post($form.attr('action'), $form.serialize(), function(result) {
			        	if (result.message == 'existed') {
			        		html = '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong>오 이런!</strong> 중복된 이메일이군요.</div>'

			    			$('#playerForm').find('.form-group').last().after(html);
			    			$('#playerForm').find('[name="email"]').parent().addClass('has-error');

							setTimeout(function() {
								$(".alert-danger").fadeTo(500, 0).slideUp(500, function(){
									$(this).remove();
								});
							}, 5000)


			        	}else {
			        		location.reload();
			        	}

			        }, 'json');
			    });
		}();


		/* ---------------------------------------------------------
		 * Love Call and Request Call
		 */
		+function () {
			'use strict';

			$('.requestCallModal form')
		        .find('[name="position"]')
		            .selectpicker()
		            .change(function(e) {
		                // revalidate the language when it is changed
		                $('#bootstrapSelectForm').bootstrapValidator('revalidateField', 'position');
		            })
		            .end()
				.bootstrapValidator({
					// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
					live : 'submitted',
		            excluded: ':disabled',
					feedbackIcons: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
		                position: {
		                	feedbackIcons: 'false',
		                    validators: {
		                        notEmpty: {
		                            message: '포지션을 선택해야합니다.'
		                        }
		                    }
		                }
					}
				})

			$('.responseCallModal form')
		        .find('[name="position"]')
		            .selectpicker()
		            .change(function(e) {
		                // revalidate the language when it is changed
		                $('#bootstrapSelectForm').bootstrapValidator('revalidateField', 'position');
		            })
		            .end()
		        .find('[name="squadNumber"]')
		            .selectpicker()
		            .change(function(e) {
		                // revalidate the language when it is changed
		                $('#bootstrapSelectForm').bootstrapValidator('revalidateField', 'squadNumber');
		            })
		            .end()
				.bootstrapValidator({
					// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
					live : 'submitted',
		            excluded: ':disabled',
					feedbackIcons: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
		                position: {
		                	feedbackIcons: 'false',
		                    validators: {
		                        notEmpty: {
		                            message: '포지션을 선택해야합니다.'
		                        }
		                    }
		                },
		                squadNumber: {
		                	feedbackIcons: 'false',
		                    validators: {
		                        notEmpty: {
		                            message: '등번호를 선택해야합니다.'
		                        }
		                    }
		                }
					}
				})
		}();




});


