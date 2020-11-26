<script>
    import { onMount } from 'svelte';
    import { ScaleOut } from 'svelte-loading-spinners'
    import ColorContrast  from './lib/colorContrast';
    import Wallet from './modules/wallet';
    import { token, cid, phone, points, settings, location } from './store/app.store';

    import HomeArea from './components/HomeArea.svelte'
    import RewardsArea from './components/RewardsArea.svelte'
    import ProfileArea from './components/ProfileArea.svelte'

    let currentPage = "home";

    let appTheme = "app-theme-light";
    let backgroundColor;
    let foreColor;
    let appLogo = '/assets/images/logo-extended.png';
    let activeColor = '#03bb85'
    let loading = true;

    onMount(async () => {
        readAppEntryPoint();
        await Wallet.app.token()
            .then(response => response.json())
            .then(result => {
                localStorage.setItem('token', result.token);
                token.update(t => t = result.token);
            })

        await Wallet.app.setup()
            .then(response => response.json())
            .then(result => {
                settings.update(s => s = result.setup);

                backgroundColor = $settings.app_bg || '#fff';
                foreColor = ColorContrast.getContrast(backgroundColor, true).toLowerCase();
                activeColor = $settings.color;
                document.body.style.backgroundColor = backgroundColor;
                document.documentElement.style.backgroundColor = backgroundColor;
                appTheme = foreColor === '#ffffff' ? 'app-theme-light' : 'app-theme-dark';
                appLogo = $settings.image || appLogo;
            });

        await Wallet.customer.points()
            .then(response => response.json())
            .then(result => {
                if(result.status === 'success') {
                    let resultPoints = result.loyalty_points.map((store) => {
                        return {
                            label: store.location_name,
                            value: store.loid,
                            ...store
                        }
                    });
                    if(resultPoints.length == 0) {
                        loading = false;
                        return;
                    }

                    location.update(l => l = resultPoints[0].value);
                    points.update(p => p = resultPoints);
                    loading = false;
                }
            })
    });

    function readAppEntryPoint() {
        let pathname = window.location && window.location.pathname;
        let search = window.location && window.location.search;

        search = search.split("&");
        if (search[0]) {
            const cidParams = search[0].split("=");
            localStorage.setItem('cid', cidParams[1]);
            cid.update(c => c = cidParams[1]);           
        }
        if(search[1]){
            const phoneParams = search[1].split("=");
            localStorage.setItem('phone', phoneParams[1]);
            phone.update(p => p = phoneParams[1]);
        }
    };
</script>

<svelte:head>
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
    <script>
      // window.OneSignal = window.OneSignal || [];
      // OneSignal.push(function() {
      //   OneSignal.init({
      //     appId: "c6db4513-5b15-410b-9b8f-66e481b65948",
      //   });
      // });
    </script>
</svelte:head>

<main>
    {#if loading}
        <div class="d-flex justify-content-center align-items-center w-100 h-100">
            
            <ScaleOut size="60" color="#FF3E00" unit="px"></ScaleOut>
        </div>
    {:else}
        <div class="app-container {appTheme} py-3" style="color: {foreColor}; --theme-color: {activeColor}">
            <div class="container">
                <div class="d-flex flex-row justify-content-center mb-4">
                    <div class="app-logo animate__animated animate__pulse">
                        <img src="{appLogo}" alt="Loyalty Wallet App">
                    </div>
                </div> 
                {#if currentPage == "home"}
                    <HomeArea/>
                {/if}
                {#if currentPage == "rewards"}
                    <RewardsArea />
                {/if}
                {#if currentPage == "profile"}
                    <ProfileArea />
                {/if}
                
            </div>       
            
        	<div class="navigation-bar px-5">
                <div class="row justify-content-between align-items-center px-2">
                    <div class="d-flex flex-column justify-content-center align-items-center app-button-link" 
                        on:click="{() => currentPage = 'home'}" class:active={currentPage == 'home'}>
                        <i class="icones-bar iconsminds-home app-button-link-icon"></i>
                        <p class="app-button-link-label">Home</p>
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center app-button-link" 
                        on:click="{() => currentPage = 'rewards'}" class:active={currentPage == 'rewards'}>
                        <i class="icones-bar iconsminds-gift-box app-button-link-icon"></i>
                        <p class="app-button-link-label">Rewards</p>
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center app-button-link" 
                        on:click="{() => currentPage = 'profile'}" class:active={currentPage == 'profile'}>
                        <i class="icones-bar iconsminds-user app-button-link-icon"></i>
                        <p class="app-button-link-label">Profile</p>
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center app-button-link">
                        <i class="icones-bar iconsminds-shopping-cart app-button-link-icon"></i>
                        <p class="app-button-link-label">Shop</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    {/if}
</main>

<style>
    .navigation-bar .app-button-link.active {
        color: var(--theme-color);
    }
</style>