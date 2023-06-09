<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\CompanyData as ModelsCompanyData;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyDataController extends Controller
{
    //
    public function index(Request $request){
    $keyword = $request->query('keyword');

    $companies = ModelsCompanyData::query();

    if ($keyword) {
        $companies->where('CompanyName', 'like', "%{$keyword}%")
            ->orWhere('CompanyAddress', 'like', "%{$keyword}%");
    }

    $companies = $companies->get();

    if ($companies->isEmpty()) {
        return ResponseFormatter::error(null, 'Data not found', 404);
    }

    return ResponseFormatter::success($companies, 'Data successfully retrieved');
    }
    public function store (Request $request) {
        try{

            $validatorData = Validator::make($request->all(), [
            'CompanyID' => 'required|unique:company_data',
            'CompanyName' => 'required',
            'CompanyAddress' => 'required',
            'CompanyEstablishDate' => 'required|date',
            ]);

            if ($validatorData->fails()) {
                return ResponseFormatter::error(
                    null,
                    $validatorData->errors(),
                    422
                );
            }

        $companyData = ModelsCompanyData::create($request->all());

        return ResponseFormatter::success(
            $companyData,
            'Data succesfull create',
            200
        );
        }catch(Exception $e){
            ResponseFormatter::error(
                $e->getMessage(),
                'the given data was invalid'
            );
        }

    }

    public function show($id)
    {
        $companyData = ModelsCompanyData::find($id);

        if (!$companyData) {
            return ResponseFormatter::error(
                null,
                'Data not found',
                404
            );
        }

     return ResponseFormatter::success(
        $companyData,
        'Data succesfull given'
     );
    }

   public function update(Request $request, $id)
{
    try {
        // $request->validate([
        //     'CompanyID' => 'required|unique:company_data,CompanyID,' . $id,
        //     'CompanyName' => 'required',
        //     'CompanyAddress' => 'required',
        //     'CompanyEstablishDate' => 'required|date',
        // ]);

        $companyData = ModelsCompanyData::find($id);

        if (!$companyData) {
            return ResponseFormatter::error(
                null,
                'Data not found',
                404
            );
        }

        $companyData->update($request->all());

        return ResponseFormatter::success(
            $companyData,
            'Data successfully updated'
        );
    } catch (Exception $e) {
        return ResponseFormatter::error(
            $e->getMessage(),
            'The given data was invalid'
        );
    }
}



    public function destroy($id)
    {
        $companyData = ModelsCompanyData::find($id);

        if (!$companyData) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        $companyData->delete();

        return response()->json(['message' => 'Company deleted']);
    }







}
