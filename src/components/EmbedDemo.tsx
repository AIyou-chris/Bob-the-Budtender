import React, { useState } from 'react';
import { Copy, Eye, Code, Download } from 'lucide-react';

const EmbedDemo = () => {
  const [embedConfig, setEmbedConfig] = useState({
    width: '400',
    height: '600',
    theme: 'light',
    position: 'bottom-right',
    storeId: 'demo-dispensary',
    apiKey: 'your-api-key-here'
  });

  const generateEmbedCode = () => {
    return `<!-- Bob the Bartender Cannabis AI Assistant -->
<script>
  window.BobConfig = {
    apiKey: '${embedConfig.apiKey}',
    storeId: '${embedConfig.storeId}',
    theme: '${embedConfig.theme}',
    position: '${embedConfig.position}',
    width: '${embedConfig.width}px',
    height: '${embedConfig.height}px'
  };
</script>
<script src="https://bob-ai.dispensary.com/embed.js"></script>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    alert('Embed code copied to clipboard!');
  };

  const generateWordPressPlugin = () => {
    return `<?php
/**
 * Plugin Name: Bob the Bartender AI
 * Description: Add Bob the cannabis AI assistant to your dispensary website
 * Version: 1.0.0
 */

function bob_ai_embed() {
    $store_id = get_option('bob_store_id', 'demo-dispensary');
    $api_key = get_option('bob_api_key', 'your-api-key');
    
    echo '<script>
        window.BobConfig = {
            apiKey: "' . $api_key . '",
            storeId: "' . $store_id . '",
            theme: "light",
            position: "bottom-right"
        };
    </script>
    <script src="https://bob-ai.dispensary.com/embed.js"></script>';
}

add_action('wp_footer', 'bob_ai_embed');

// Admin settings page
function bob_ai_admin_menu() {
    add_options_page('Bob AI Settings', 'Bob AI', 'manage_options', 'bob-ai', 'bob_ai_admin_page');
}
add_action('admin_menu', 'bob_ai_admin_menu');

function bob_ai_admin_page() {
    if (isset($_POST['submit'])) {
        update_option('bob_store_id', $_POST['store_id']);
        update_option('bob_api_key', $_POST['api_key']);
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $store_id = get_option('bob_store_id', '');
    $api_key = get_option('bob_api_key', '');
    
    echo '<div class="wrap">
        <h1>Bob the Bartender AI Settings</h1>
        <form method="post">
            <table class="form-table">
                <tr>
                    <th scope="row">Store ID</th>
                    <td><input type="text" name="store_id" value="' . $store_id . '" /></td>
                </tr>
                <tr>
                    <th scope="row">API Key</th>
                    <td><input type="text" name="api_key" value="' . $api_key . '" /></td>
                </tr>
            </table>
            <p class="submit"><input type="submit" name="submit" class="button-primary" value="Save Changes" /></p>
        </form>
    </div>';
}
?>`;
  };

  const downloadWordPressPlugin = () => {
    const element = document.createElement('a');
    const file = new Blob([generateWordPressPlugin()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'bob-ai-plugin.php';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Easy Website Integration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store ID</label>
              <input
                type="text"
                value={embedConfig.storeId}
                onChange={(e) => setEmbedConfig({ ...embedConfig, storeId: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                type="text"
                value={embedConfig.apiKey}
                onChange={(e) => setEmbedConfig({ ...embedConfig, apiKey: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                <input
                  type="number"
                  value={embedConfig.width}
                  onChange={(e) => setEmbedConfig({ ...embedConfig, width: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                <input
                  type="number"
                  value={embedConfig.height}
                  onChange={(e) => setEmbedConfig({ ...embedConfig, height: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <select
                  value={embedConfig.theme}
                  onChange={(e) => setEmbedConfig({ ...embedConfig, theme: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="cannabis">Cannabis Green</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select
                  value={embedConfig.position}
                  onChange={(e) => setEmbedConfig({ ...embedConfig, position: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Embed Code</h4>
              <button
                onClick={copyToClipboard}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {generateEmbedCode()}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Integration Options</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">WordPress Plugin</h3>
              <p className="text-gray-600 text-sm mb-3">
                Easy one-click installation for WordPress-powered dispensary websites.
              </p>
              <button
                onClick={downloadWordPressPlugin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Plugin</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Shopify App</h3>
              <p className="text-gray-600 text-sm mb-3">
                Native Shopify integration for cannabis e-commerce stores.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Install from App Store
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Custom API</h3>
              <p className="text-gray-600 text-sm mb-3">
                RESTful API for custom integrations and mobile apps.
              </p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>View API Docs</span>
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">🌿 Cannabis-Compliant</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Age verification integration</li>
              <li>• State-specific product filtering</li>
              <li>• Compliance-aware responses</li>
              <li>• Legal disclaimer management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
          <div className="text-center">
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Preview of how Bob will appear on your website</p>
            <p className="text-sm text-gray-500 mt-2">
              Position: {embedConfig.position} • Theme: {embedConfig.theme} • Size: {embedConfig.width}x{embedConfig.height}px
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedDemo;