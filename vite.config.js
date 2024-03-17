import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json';


function getCurrentBranchName() {
	const { execSync } = require('child_process');
	try {
		const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
		return branchName;
	} catch (error) {
		console.error('Error retrieving Git branch name:', error);
		return 'unknown';
	}
}
	
	
	// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'import.meta.env.VITEAPP_VERSION': JSON.stringify(
			`v${pkg.version}-${!process.env.NODE_ENV == "development" ? "release" : "devel"}` ||
			"unknown"
		)
	}
})