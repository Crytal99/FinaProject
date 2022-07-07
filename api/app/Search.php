<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Search extends Model
{
    protected $table = 'search_setting';

    protected $fillable = [
        'search_enabled',
        'search_config',
    ];

}
