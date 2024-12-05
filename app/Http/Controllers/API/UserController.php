<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user();

        $avatar_url = $user->avatar ? Storage::url($user->avatar) : null;

        return response()->json([
            'success' => true,
            'user' => $user,
            'avatar_url' => $avatar_url,
        ]);
    }


    public function update_profile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            /**
             * @var App\Models\User
             */
            $user = Auth::user();
            $user->name = $request->input('name');
            $user->save();
            return response()->json([
                'message' => 'Profile updated successfully!',
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while updating your profile.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10000',
        ], [
            'avatar.required' => 'Please Select Image to Update Avatar'
        ]);

        $user = $request->user();

        if ($request->hasFile('avatar')) {
            if ($user->avatar_url && file_exists(public_path('storage/' . $user->avatar_url))) {
                $oldAvatarPath = public_path('storage/' . $user->avatar_url);
                unlink($oldAvatarPath);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar_url = $path;
            $user->save();
        }

        return response()->json([
            'message' => 'Avatar updated successfully!',
            'user' => $user
        ], 200);
    }
}
