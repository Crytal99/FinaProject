<?php

namespace App\Jobs;

use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;

class UpdateUserProfile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $shopify_shop = $this->user->api()->rest('GET', '/admin/shop.json')['body']['shop']->toArray();

        $this->user->fill($this->transformShopifyShop($shopify_shop));
        $this->user->save();

        if ($this->user->wasChanged('shop_id')) {
            event(new Registered($this->user));
        }
    }

    public function transformShopifyShop(array $shopify_shop)
    {
        $shopify_shop['shop_id'] = Arr::get($shopify_shop, 'id');
        $shopify_shop['shop_name'] = Arr::get($shopify_shop, 'name');
        $shopify_shop['shop_email'] = Arr::get($shopify_shop, 'email');
        $shopify_shop['shop_created_at'] = Arr::get($shopify_shop, 'created_at');
        $shopify_shop['shop_updated_at'] = Arr::get($shopify_shop, 'updated_at');

        return Arr::except($shopify_shop, [
            'id',
            'name',
            'email',
            'created_at',
            'updated_at',
        ]);
    }
}
