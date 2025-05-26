<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\facades\Hash;

class userController extends Controller
{

    //register
    public function register(Request $request){
        //validation
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',    
            'email' => 'required|email',
            'password' => 'required',
        ]);

        //verifier si tous les champs sont remplis
        if(!$validatedData){
            return response()->json(['error' => 'Veuillez remplir tous les champs.'],500);
        }

        //verifier si name ou email exist deja 
        $existedName = user::where('name', $validatedData['name'])->first();
        $existedEmail = user::where('email', $validatedData['email'])->first();
        if($existedName){            
            return response()->json(['error' => 'Ce nom d\'utilisateur existe deja.'],500);
        }

        if($existedEmail){            
            return response()->json(['error' => 'Ce email existe deja.'],500);
        }

        //creer user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password'])
        ]);

        //retour success si OK
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Utilisateur cree avec success',
            'user' => $user
        ],200);
    }

    //lohin
    public function login(Request $request){
        //validation
        $validatedData = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        //tester tous les champs sont remplis
        if(!$validatedData){
            return response()->json(['error' => 'Veuillez remplir tous les champs.'],500);
        }

        //tester si login entrer est correct
        $user = User::where('name', $validatedData['name'])->first();
        if(!$user || !Hash::check($validatedData['password'], $user->password)){
            return response()->json(['error' => 'Nom d\'utilisateur ou mot de passe incorrect.'],500);
        }

        //creer token
        $token = $user->createToken('auth_token')->plainTextToken;

        //retourner succes
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Utilisateur connecte avec success',
            'user' => $user,
            'token' => $token
        ],200);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Utilisateur deconnecte avec success'
        ],200);
    }
}
