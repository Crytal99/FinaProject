<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Osiset\ShopifyApp\Contracts\ShopModel as IShopModel;
use Osiset\ShopifyApp\Traits\ShopModel;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements IShopModel, JWTSubject
{
    use Notifiable, ShopModel;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'shop_id',
        'shop_name',
        'shop_email',
        'domain',
        'province',
        'country',
        'address1',
        'zip',
        'city',
        'source',
        'phone',
        'latitude',
        'longitude',
        'primary_locale',
        'address2',
        'shop_created_at',
        'shop_updated_at',
        'country_code',
        'country_name',
        'currency',
        'customer_email',
        'timezone',
        'iana_timezone',
        'shop_owner',
        'money_format',
        'money_with_currency_format',
        'weight_unit',
        'province_code',
        'taxes_included',
        'auto_configure_tax_inclusivity',
        'tax_shipping',
        'county_taxes',
        'plan_display_name',
        'plan_name',
        'has_discounts',
        'has_gift_cards',
        'myshopify_domain',
        'google_apps_domain',
        'google_apps_login_enabled',
        'money_in_emails_format',
        'money_with_currency_in_emails_format',
        'eligible_for_payments',
        'requires_extra_payments_agreement',
        'password_enabled',
        'has_storefront',
        'eligible_for_card_reader_giveaway',
        'finances',
        'primary_location_id',
        'cookie_consent_level',
        'visitor_tracking_consent_preference',
        'checkout_api_supported',
        'multi_location_enabled',
        'setup_required',
        'pre_launch_enabled',
        'enabled_presentment_currencies',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'taxes_included' => 'boolean',
        'auto_configure_tax_inclusivity' => 'boolean',
        'tax_shipping' => 'boolean',
        'county_taxes' => 'boolean',
        'has_discounts' => 'boolean',
        'has_gift_cards' => 'boolean',
        'eligible_for_payments' => 'boolean',
        'requires_extra_payments_agreement' => 'boolean',
        'password_enabled' => 'boolean',
        'has_storefront' => 'boolean',
        'eligible_for_card_reader_giveaway' => 'boolean',
        'finances' => 'boolean',
        'primary_location_id' => 'integer',
        'checkout_api_supported' => 'boolean',
        'multi_location_enabled' => 'boolean',
        'setup_required' => 'boolean',
        'pre_launch_enabled' => 'boolean',
        'enabled_presentment_currencies' => 'array',
    ];

    protected $dates = [
        'deleted_at',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function routeNotificationForMail(){
        return $this->shop_email;
    }
}
