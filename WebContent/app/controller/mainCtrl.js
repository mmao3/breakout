(function() {
	'use strict';
	var controllerId = 'mainCtrl';
	angular.module('app').controller(controllerId,
			[ '$scope', '$location', '$http', 'GetTime', 'Util', mainCtrl ]);
	function mainCtrl($scope, $location, $http, GetTime, Util) {
		$scope.user = {};
		$scope.checkboxModel = {
			value : !!localStorage.getItem("signIn")
		};
		$scope.logInuser = {
			username : localStorage.getItem("userName"),
			password : localStorage.getItem("password")
		};
		$scope.currentUser;
		$scope.isMatched = true;
		$scope.usernameclass = "tip-sign";
		$scope.emailclass = "tip-sign";
		$scope.passwordclass = "tip-sign";
		$scope.usernameInput = "hinted";
		$scope.usernameEmail = "hinted";
		$scope.usernamePassword = "hinted";
		$scope.pinglun = "COMMENT";
		$scope.$watchCollection("comments",
				function() {
					$scope.pinglun = $scope.comments
							&& $scope.comments.length > 1 ? "COMMENTS"
							: "COMMENT";
				});
		$scope.$watchCollection("checkboxModel", function(newValue, oldValue) {
			console.log(newValue);
			if (newValue.value) {
				localStorage.setItem("userName", $scope.logInuser.username);
				localStorage.setItem("password", $scope.logInuser.password);
				localStorage.setItem("signIn", "true");
			} else {
				localStorage.setItem("userName", "");
				localStorage.setItem("password", "");
				localStorage.setItem("signIn", "");
			}
		});
		(function() {
			$('#input-2c').rating({
				starCaptions : function(val) {
					return "Rate this game!";
				}
			});
			$('#input-2c').on('rating.hover',
					function(event, val, caption, target) {

						if (val <= 1) {
							$(".caption .label").html("It's awful");
						} else if (val <= 2) {
							$(".caption .label").html("I'm not a fan");
						} else if (val <= 3) {
							$(".caption .label").html("It's okay");
						} else if (val <= 4) {
							$(".caption .label").html("I like it");
						} else {
							$(".caption .label").html("I love it");
						}

					});

			if (localStorage.getItem("isRated1")) {

				$('#input-2c').rating('refresh', {
					disabled : true
				});
			}
			$http.get("Rating").success(function(data) {

				var total = data[0].total;
				var times = data[0].times;
				var rating = 0;
				if (times != 0) {
					rating = total / times;
				}

				$('#input-2c').rating('update', rating);
			});

			$(".icon--info").hover(

			function() {

				$(".info").fadeIn(100);
				$(".fadeColor").show("slide", {
					direction : "right"
				}, 100);

			},

			function() {
				$(".fadeColor").hide("slide", {
					direction : "right"
				}, 100)

				$(".info").fadeOut(100);

			}

			);

			$('#input-2c').on('rating.change', function() {

				$('#input-2c').rating('refresh', {
					disabled : true
				});
				localStorage.setItem("isRated1", "true");
				$http({
					method : 'post',
					url : 'Rating',
					data : $.param({
						fkey : $('#input-2c').val() + ""
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).success(function(d, status, headers, config) {

				});
			});
		})();
		$scope.verifyUsername = function() {
			if (!Util.validateUsername($scope.user.username)) {
				$scope.usernameInput = "hinted wrong";
				$scope.usernameclass = "tip-sign";
				$scope.usernameValid = false;
			} else {
				$scope.usernameclass = "tip-sign loading";
				$http({
					method : 'post',
					url : 'verify',
					data : $.param({
						fkey : JSON.stringify({
							key : "userName",
							value : $scope.user.username
						})
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).success(function(d, status, headers, config) {
					if (d) {
						$scope.usernameclass = "tip-sign wrong";
						$scope.usernameValid = false;

					} else {
						$scope.usernameclass = "tip-sign right";
						$scope.usernameInput = "hinted";
						$scope.usernameValid = true;
					}

				});
			}
		};
		$scope.verifyEmail = function(sign) {
			if (!Util.validateEmail($scope.user.email)) {
				$scope.usernameEmail = "hinted wrong";
				$scope.emailclass = "tip-sign";
				$scope.emailValid = false;
			} else {
				$scope.emailclass = "tip-sign loading";
				$http({
					method : 'post',
					url : 'verify',
					data : $.param({
						fkey : JSON.stringify({
							key : "email",
							value : $scope.user.email
						})
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).success(function(d, status, headers, config) {
					if (sign ? !d : d) {
						$scope.emailclass = "tip-sign wrong";
						$scope.emailValid = false;
					} else {
						$scope.emailclass = "tip-sign right";
						$scope.usernameEmail = "hinted";
						$scope.emailValid = true;
					}

				});
			}
		};
		$scope.verifyPassword = function() {
			if (!Util.validatePassword($scope.user.password)) {
				$scope.usernamePassword = "hinted wrong";
				$scope.passwordclass = "tip-sign";
				$scope.passwordValid = false;
			} else {
				$scope.usernamePassword = "hinted";
				$scope.passwordclass = "tip-sign right";
				$scope.passwordValid = true;
			}
		};
		$scope.verifyPassword1 = function() {
			if (!$scope.user.password2
					|| $scope.user.password2.trim().length == 0) {
				if (!Util.validatePassword($scope.user.password1)) {
					$scope.usernamePassword1 = "hinted wrong";
					$scope.passwordclass1 = "tip-sign";
					console.log("wrong");
					return false;
				} else {
					$scope.usernamePassword1 = "hinted";
					$scope.passwordclass1 = "tip-sign right";
					console.log("right");
					return true;
				}

			} else {
				if (Util.validatePassword($scope.user.password1)
						&& $scope.user.password1 === $scope.user.password2) {
					$scope.usernamePassword1 = "hinted";
					$scope.passwordclass1 = "tip-sign right";
					return true;

				} else {
					$scope.usernamePassword1 = "hinted wrong";
					$scope.passwordclass1 = "tip-sign";
					return false;
				}

			}

		};
		$scope.verifyPassword2 = function() {
			if ($scope.verifyPassword1()
					&& $scope.user.password1 === $scope.user.password2) {
				$scope.usernamePassword2 = "hinted";
				$scope.passwordclass2 = "tip-sign right";
				return true;

			} else {
				$scope.usernamePassword2 = "hinted wrong";
				$scope.passwordclass2 = "tip-sign";
				return false;
			}
		};
		(function() {

			$http.get("comment").success(
					function(data) {

						GetTime.getUTC(function(now) {
							$scope.comments = data;
							$scope.comments.sort(compare);
							for (var i = 0; i < $scope.comments.length; i++) {
								$scope.comments[i].date = GetTime
										.getTimeInterval(
												$scope.comments[i].date, now);
								console.log($scope.comments[i]);
							}
							$scope.$apply();
						});
					});

			function compare(a, b) {
				if (new Date(a.date).getTime() > new Date(b.date).getTime())
					return -1;
				else if (new Date(a.date).getTime() < new Date(b.date)
						.getTime())
					return 1;
				return 0;
			}

		})();
		(function() {

			if (localStorage.getItem("currentUser")) {
				$scope.currentUser = JSON.parse(localStorage
						.getItem("currentUser"));
				$scope.showCurrentUser = true;
			}

		})();

		$scope.logIn = function() {
			// alert(Util.validatePassword($scope.user.password));
			// alert(Util.validatePassword($scope.user.password)&&(Util.validateEmail($scope.user.username)||Util.validateUsername($scope.user.username)));
			if (!$scope.isLoggin
					&& Util.validatePassword($scope.logInuser.password)
					&& (Util.validateEmail($scope.logInuser.username) || Util
							.validateUsername($scope.logInuser.username))) {
				$scope.isLoggin = true;
				$http({
					method : 'post',
					url : 'SignIn',
					data : $.param({
						fkey : JSON.stringify({
							username : $scope.logInuser.username,
							password : $scope.logInuser.password
						})
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).success(
						function(d, status, headers, config) {
							setTimeout(function() {
								$scope.isLoggin = false;
							}, 100);
							if (d) {
								$scope.isMatched = true;
								$scope.currentUser = d;
								$scope.showCurrentUser = true;
								localStorage.setItem("currentUser", JSON
										.stringify($scope.currentUser));
								$('#signInModal').modal('hide');
								if ($scope.checkboxModel.value) {
									localStorage.setItem("userName",
											$scope.logInuser.username);
									localStorage.setItem("password",
											$scope.logInuser.password);
									localStorage.setItem("signIn", "true");
								}
							} else {
								$scope.isMatched = false;
							}

						});
			} else {
				$scope.isMatched = false;
				$scope.isLoggin = false;
			}
		}
		$scope.gotoNext = function() {
			if (!Util.validateEmail($scope.user.email)) {
				$scope.usernameEmail = "hinted wrong";
				$scope.emailclass = "tip-sign";
				$scope.emailValid = false;
				$scope.isNexting = false;
			} else {
				$scope.emailclass = "tip-sign loading";
				$scope.isNexting = true;
				$http({
					method : 'post',
					url : 'verify',
					data : $.param({
						fkey : JSON.stringify({
							key : "email",
							value : $scope.user.email
						})
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).success(function(d, status, headers, config) {
					setTimeout(function() {
						$scope.isNexting = false;
					}, 100);
					if (!d) {
						$scope.emailclass = "tip-sign wrong";
						$scope.isNext = false;
					} else {
						$scope.emailclass = "tip-sign right";
						$scope.usernameEmail = "hinted";
						$scope.isNext = true;
					}

				});
			}
		}
		$scope.reset = function() {
			// console.log($scope.resetPassword1()&&$scope.resetPassword2&&!$scope.isResting);
			if ($scope.verifyPassword1() && $scope.verifyPassword2()
					&& !$scope.isResting) {
				$scope.isResting = true;
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				var pair = vars[1].split("=");
				$http({
					method : 'post',
					url : 'newPassword',
					data : $.param({
						fkey : JSON.stringify({
							reset_token : pair[1],
							password : $scope.user.password2.trim()
						})
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				})
						.success(
								function(d, status, headers, config) {
									setTimeout(function() {
										$scope.isResting = false;
									}, 100);
									isMadal3 = false;
									$('#resetPasswordModal').modal('hide');
									window.location.href = "http://breakout.maomao.work/reset-confirmation.html";

								});

			}

		}
		$scope.resetPassword = function() {

			if (!$scope.isReseted) {
				$scope.isReseted = true;
				console.log({
					email : $scope.user.email,
					token : Util.getRandom(32)
				});
				$http({
					method : 'POST',
					url : 'resetPassword',
					data : $.param({
						fkey : JSON.stringify({
							email : $scope.user.email,
							token : Util.getRandom(32)
						})
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				})
						.success(
								function() {

									$('#resetPasswordModal').modal('hide');
									window.location.href = "http://breakout.maomao.work/resetPassword.html";
									setTimeout(function() {
										$scope.isReseted = false;
									}, 100);

								});
			}

		}
		$scope.logout = function() {
			localStorage.removeItem("currentUser");
			$scope.showCurrentUser = false;
			$scope.currentUser = undefined;
			if (!$scope.checkboxModel.value) {
				$scope.logInuser = {};
			}

		}
		$scope.register = function() {
			if (!$scope.isSubmited && $scope.usernameValid && $scope.emailValid
					&& $scope.passwordValid) {
				$scope.isSubmited = true;
				$scope.user.token = Util.getRandom(32);
				$scope.user.id = Util.getRandom(32);
				$scope.user.username = $scope.user.username.trim();
				$scope.user.email = $scope.user.email.trim();
				$scope.user.password = $scope.user.password.trim();
				$http({
					method : 'POST',
					url : 'register',
					data : $.param({
						fkey : JSON.stringify($scope.user)
					}),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				})
						.success(
								function() {

									$('#myModal').modal('hide');
									setTimeout(function() {
										$scope.isSubmited = false;
									}, 100);
									$scope.usernameValid = false;
									$scope.emailValid = false;
									$scope.passwordValid = false;
									window.location.href = "http://breakout.maomao.work/confirmation.html";

								});

			}

		}

		function getQueryVariable() {
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			if (vars.length == 1) {
				var pair = vars[0].split("=");
				if (pair[0] == "token") {
					$http(
							{
								method : 'post',
								url : 'verify',
								data : $.param({
									fkey : JSON.stringify({
										key : "regis_token",
										value : pair[1]
									})
								}),
								headers : {
									'Content-Type' : 'application/x-www-form-urlencoded'
								}
							})
							.success(
									function(d, status, headers, config) {
										if (d) {
											$scope.currentUser = d;
											$scope.showCurrentUser = true;
											localStorage
													.setItem(
															"currentUser",
															JSON
																	.stringify($scope.currentUser));
											window.location.href = "http://breakout.maomao.work/";
										}

									});
					// $http.get('verify').success(function (data, status,
					// headers, config) {
					// alert(data) ; }); //- See more at:
					// http://ng-angular-js.blogspot.com/2015/01/reading-data-from-servlet-via-angular.html#sthash.fhIFBxtO.dpuf
					window.onload = function() {
						init();

					};
				} else if (pair[0] === "login") {

					window.onload = function() {
						init();
						isMadal2 = true;
						setTimeout(function() {
							$('#signInModal').modal('show');
						}, 100);

					};
					//					
					// isMadal2 = true;
					// $('#signInModal').modal('show');
					// $(document).ready(function() {
					// alert("da");
					// init();
					// isMadal2 = true;
					// $('#signInModal').modal('show');
					// });
					// isMadal2 = true;
					// $('#signInModal').modal('show');
				} else if (pair[0] === "") {
					window.onload = function() {
						init();

					};

				} else {
					window.onload = function() {
						init();

					};
				}

			} else if (vars.length == 2) {
				var pair = vars[1].split("=");
				if (pair[0] == "token") {
					$http(
							{
								method : 'post',
								url : 'verify',
								data : $.param({
									fkey : JSON.stringify({
										key : "reset_token",
										value : pair[1]
									})
								}),
								headers : {
									'Content-Type' : 'application/x-www-form-urlencoded'
								}
							}).success(function(d, status, headers, config) {
						if (d) {
							setTimeout(function() {
								$scope.isResting = false;
							}, 100)
							isMadal3 = true;
							$('#resetPasswordModal').modal('show');

						} else {

						}

					});
					// $http.get('verify').success(function (data, status,
					// headers, config) {
					// alert(data) ; }); //- See more at:
					// http://ng-angular-js.blogspot.com/2015/01/reading-data-from-servlet-via-angular.html#sthash.fhIFBxtO.dpuf

				} else {

				}
				window.onload = function() {
					init();

				};
			} else {
				window.onload = function() {
					init();

				};
			}

		}
		getQueryVariable();
		$scope.switchModal = function(sign) {
			if (sign === "signIn") {
				$('#myModal').modal('hide');
				$('#signInModal').modal('show');
				$('#resetPasswordModal').modal('hide');
			} else if (sign === "signUp") {
				$('#myModal').modal('show');
				$('#signInModal').modal('hide');
			} else {
				$('#resetPasswordModal').modal('show');
				$('#signInModal').modal('hide');
			}

		}
		$scope.commentTemplate = "app/partials/comment.html"
		$scope.postComments = function() {

			GetTime
					.getUTC(function(date) {
						var body = encodeURIComponent(($(".pw-message").text()));
						var userName = $scope.currentUser.username;
						var comment = {
							"id" : userName,
							"comment" : body,
							"date" : date
						};
						if (!$scope.comments) {
							$scope.comments = [];
						}
						if (body.trim().length > 0) {
							$scope.comments.unshift({
								username : userName,
								comment : $(".pw-message").text(),
								date : "1 minute"
							});
							$scope.$apply();

							$http({
								method : 'POST',
								url : 'comment',
								data : $.param({
									fkey : JSON.stringify(comment)
								}),
								headers : {
									'Content-Type' : 'application/x-www-form-urlencoded'
								}
							});
						}

						$(".pw-message").text("");
					});
		}

	}

}());
