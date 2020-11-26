<script>
    import { points, settings, location } from '../store/app.store';

    import ColorContrast  from '../lib/colorContrast';

    let loyaltyPoints = $points.length > 0 ? $points[0].total_points : 0;
    let loyaltyType   = $points.length > 0 ? $points[0].reward_type : 'points';

    let pointsColor = ColorContrast.getContrast($settings.color, true);

    function onSelectStore (e) {
        let locationId = parseInt(event.target.value);
        let location   = $points.find(p => p.loid == locationId);
        loyaltyPoints  = location.total_points || 0;
        loyaltyType    = location.reward_type || 'points';
        location.update(l => l = locationId);
    }
</script>

<div class="section-container animate__animated animate__fadeInUp animate__faster p-0 mt-3">
    
    <p class="display-4 text-center ">Welcome</p>
    <p class="lead pb-3 text-center">{$settings.points || "You don't have any points yet"}</p>

    <div class="locations-container col-md-8 col-sm-12 mx-auto d-flex flex-column justify-content-center align-items-center mt-2">
        <label class="form-group mb-4 w-100 text-left">
            <span class="form-control-label">Select one Store:</span>
            <div class="form-control-bg">
                <select class="form-control" on:change="{onSelectStore}">
                    {#each $points as point}
                        <option value={point.value}>{point.label}</option>
                    {/each}
                </select>
            </div>
        </label>
    </div>
    <hr>
    <div class="row d-flex justify-content-center align-items-center">
        <div class="points-container d-block text-center d-flex flex-column justify-content-center align-items-center" style="background-color: {$settings.color}">
            <span class="display-4" style="color: {pointsColor}">
                {loyaltyPoints}
            </span>
            <span class="text-capitalize" style="color: {pointsColor}">
                {loyaltyType}
            </span>
        </div>
    </div>
</div>