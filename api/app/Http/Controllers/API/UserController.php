<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function show()
    {
        return auth()->user();
    }
}
