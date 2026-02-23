<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SearchCache;
class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->query('keyword', 'Bang Sue');
        $cached = SearchCache::where('keyword', $keyword)->first();

        if ($cached) {
            return response()->json([
                'status' => 'success',
                'source' => 'database_cache',
                'data' => json_decode($cached->results)
            ]);
        }
        $restaurants = [
            [
                'id' => rand(100, 999),
                'name' => $keyword . ' Central Kitchen',
                'address' => '99/1 Techa Vanich Rd, ' . $keyword,
                'rating' => 4.5,
                'lat' => 13.8040,
                'lng' => 100.5370
            ],
            [
                'id' => rand(101, 999),
                'name' => 'River Side Noodles @ ' . $keyword,
                'address' => 'Pracharat Road, ' . $keyword,
                'rating' => 4.2,
                'lat' => 13.8060,
                'lng' => 100.5395
            ],
            [
                'id' => rand(102, 999),
                'name' => 'Hidden Cafe - ' . $keyword,
                'address' => 'Soi Rim Khlong, ' . $keyword,
                'rating' => 4.8,
                'lat' => 13.8010,
                'lng' => 100.5340
            ],
        ];
        SearchCache::create([
            'keyword' => $keyword,
            'results' => json_encode($restaurants)
        ]);
        return response()->json([
            'status' => 'success',
            'source' => 'external_api_mock',
            'data' => $restaurants
        ]);
    }
}



// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\SearchCache;

// class RestaurantController extends Controller
// {
//     public function index(Request $request)
//     {
//         // รับค่า keyword ถ้าไม่มีให้ใช้ "Bang Sue" ตามโจทย์
//         $keyword = $request->query('keyword', 'Bang Sue');

//         // 1. ลองหาใน Database ก่อน (Cache Hit)
//         $cachedData = SearchCache::where('keyword', $keyword)->first();

//         if ($cachedData) {
//             return response()->json([
//                 'status' => 'success',
//                 'source' => 'cache',
//                 'data' => json_decode($cachedData->results)
//             ]);
//         }

//         // 2. ถ้าไม่มีใน DB (Cache Miss) ให้ไปดึงจาก API ภายนอก 
//         // ในที่นี้ผมจะจำลองข้อมูล (Mock Data) ให้ก่อนเพื่อให้คุณรันงานได้ทันที
//         $restaurants = [
//             ['id' => 1, 'name' => 'Bang Sue Bistro', 'lat' => 13.804, 'lng' => 100.537, 'rating' => 4.5],
//             ['id' => 2, 'name' => 'The Station Café', 'lat' => 13.806, 'lng' => 100.539, 'rating' => 4.0],
//             ['id' => 3, 'name' => 'Hidden Gem Kitchen', 'lat' => 13.802, 'lng' => 100.535, 'rating' => 4.8],
//         ];

//         // 3. บันทึกลง Database ไว้ใช้ครั้งหน้า
//         SearchCache::create([
//             'keyword' => $keyword,
//             'results' => json_encode($restaurants)
//         ]);

//         return response()->json([
//             'status' => 'success',
//             'source' => 'external_api',
//             'data' => $restaurants
//         ]);
//     }
// }
