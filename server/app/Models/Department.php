<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Course;

class Department extends Model
{
    protected $fillable = [
        'name',
        'status',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
