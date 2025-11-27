<template>
    <div class="dashboard-wrapper">
        <aside class="dashboard-sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li><a href="/news">Home</a></li>
                <li><a href="#">Users</a></li>
                <li><a href="#">Posts</a></li>
                <li><a href="#">Settings</a></li>
            </ul>
        </aside>
        <main class="dashboard-main">
            <header class="dashboard-header">
                <h1>Welcome to Dashboard</h1>
                <p>This is your admin panel. Add features here!</p>
            </header>
            <section class="dashboard-content">
                <div class="card">
                    <h3>Quick Stats</h3>
                    <ul>
                        <li>Users: 0</li>
                        <li>Posts: 0</li>
                        <li>Visits: 0</li>
                    </ul>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: 'DashboardPage',

    methods:{
        hand(){
            this.$router.push('/news')
        }
    }
}
</script>

<style scoped>
.dashboard-wrapper {
    display: flex;
    min-height: 100vh;
    background: #f8f9fa;
}

.dashboard-sidebar {
    width: 220px;
    background: #343a40;
    color: #fff;
    padding: 2rem 2rem;
}

.dashboard-sidebar h2 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: white;
}

.dashboard-sidebar ul {
    list-style: none;
    padding: 0;
}

.dashboard-sidebar li {
    margin-bottom: 1rem;
}

.dashboard-sidebar a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
}
.dashboard-main{
    flex: 1;
    padding: 2rem;
}

.dashboard-header h1 {
    margin-bottom: 0.5rem;
}

.dashboard-content .card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    max-width: 400px;
}
</style>