<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    public function create(){
        return auth()->user();
    }
}
