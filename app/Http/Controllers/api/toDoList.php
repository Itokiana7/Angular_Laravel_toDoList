<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\tache;
use Illuminate\Http\Request;

class toDoList extends Controller
{
    //récupérer tous les taches
    public function getToDo(){
        $Tache = tache::all();
        return response()->json($Tache);
    }

    //Ajouter une tache
    public function addTache(Request $request){
        //validation des données
        $validatedData = $request->validate([
            'nom' =>'required',
        ]);

        //Test des donnée
            //test si champ vide
            if(!$validatedData){
                return response()->json(['error' => 'Veuillez remplir tous les champs.'],500);
            }

            //test si tache exist deja
            $existTache = tache::where('nom',$validatedData['nom'])->first();
            if($existTache){
                return response()->json(['error' => 'Cette tache existe deja.'],500);
            }

        //Creation de la tache
            $Tache = tache::create($validatedData);

            //Message de confirmation
            return response()->json([
                'success' => true,
                'message' => 'Tache ajoute avec success',
                'data' => $Tache
            ],200);
    }

    //Modifier une tache
    public function editTache(Request $request, $id){
        //tester si tache exist
        $tache = tache::find($id);
        if(!$tache){
            return response()->json(['error' => 'Cette tache n\'existe pas.'],500);
        }

        //validation des données
        $validatedData = $request->validate([
            'nom' =>'required',
        ]);

        //update tache
        $tache->update($validatedData);

        //Message de confirmation
        return response()->json([
            'success' => true,
            'message' => 'Tache modifie avec success',
            'data' => $tache
        ], 200);
    }

    //suprimer un tache
    public function deleteTache($id){
        //recuperer tache
        $tache = tache::find($id);
        //tester si tache exist
        if(!$tache){
            return response()->json(['error' => 'Cette tache n\'existe pas.'],500);
        }

        
        //suppression du tache
        $tache->delete();

        //message de confirmation
        return response()->json([
            'success' => true,
            'message' => 'Tache supprime avec success'
        ], 200);
    }

}
