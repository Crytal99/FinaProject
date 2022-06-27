<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('API')->name('api.')->group(function () {
    Route::post('token/refresh', 'TokenController@refresh')->name('token.refresh');

    Route::middleware('auth:api')->group(function () {
        Route::get('user', 'UserController@show')->name('user.show');
    });
});
