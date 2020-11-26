<div class="section-container animate__animated animate__fadeInUp animate__faster p-0 mt-3">
    <p class="display-4 text-center ">Rewards Area</p>
    <p class="lead pb-3 text-center">Check out the fabulous rewards you can access</p>

    <div class="rewards-container">
        <div class="group-section">
            <div class="card reward-card"></div>
        </div>
    </div>
</div>

<script>
    import { onMount } from 'svelte';
    import { location } from '../store/app.store';
    import Wallet from '../modules/wallet';

    onMount( async () => {
        Wallet.customer.rewards($location)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
    })
</script>