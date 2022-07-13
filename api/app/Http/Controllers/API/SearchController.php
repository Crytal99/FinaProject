<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class SearchController extends Controller
{
    public function create(){
        $search = DB::table('search_setting')->get();
        return $search;
    }
    public function update(Request $request){
        // return redirect('/home');
        return redirect()->back()->with('status','Student Updated Successfully');
    }
}
