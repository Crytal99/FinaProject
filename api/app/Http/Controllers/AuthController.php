<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Osiset\ShopifyApp\Actions\AuthenticateShop;
use Osiset\ShopifyApp\Exceptions\SignatureVerificationException;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use Osiset\ShopifyApp\Services\ShopSession;
use Osiset\ShopifyApp\Traits\AuthController as AuthControllerTrait;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    use AuthControllerTrait;

    /**
     * @inheritDoc
     */
    public function authenticate(Request $request, AuthenticateShop $authenticateShop, ShopSession $shopSession)
    {
        // Get the shop domain
        $shopDomain = ShopDomain::fromNative($request->get('shop'));

        // Run the action, returns [result object, result status]
        [$result, $status] = $authenticateShop($request);

        if ($status === null) {
            // Show exception, something is wrong
            throw new SignatureVerificationException('Invalid HMAC verification');
        } elseif ($status === false) {
            // No code, redirect to auth URL
            return $this->oauthFailure($result->url, $shopDomain);
        } else {
            $user = auth()->user();
            $token = JWTAuth::fromUser($user);
            $expires_in = auth()->factory()->getTTL() * 60;

            return redirect(config('app.portal_url') . '/auth?token=' . $token . '&expires_in=' . $expires_in);
        }
    }
}
