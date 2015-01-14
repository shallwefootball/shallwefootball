
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
