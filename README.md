# Chrome-Client-Bridge Library

This library allows Android apps to call public Activity methods directly from WebView JavaScript.  
No `@JavascriptInterface` is required. Just attach the Activity, and any public method becomes callable from JS.

---

## ✨ Features
- Works on Android API 19+
- JS ↔ Java communication through JSON payloads
- Supports primitive types: `String`, `int`, `boolean`, `double`
- Call any **public Activity method** directly from JavaScript
- Return values supported (void, string, int, boolean, double)
- Beginner friendly — works with **Sketchware** style custom functions

---

## 🚀 Setup

**1. Import the library**
```java
import com.chrome.bridge.*;
```

**2. Attach Activity**
```java
ChromeBridge.attachActivity(this);
```

**3. Configure WebView**
```java
WebView webView = findViewById(R.id.webView);

WebSettings s = webView.getSettings();
s.setJavaScriptEnabled(true);   // Enable JS
s.setDomStorageEnabled(true);   // Enable Local Storage
s.setAllowFileAccess(true);     // Allow file access
s.setCacheMode(WebSettings.LOAD_NO_CACHE); // Disable cache
webView.clearCache(true);       // Clear old cache

webView.setWebChromeClient(new BridgeChromeClient());
webView.setWebViewClient(new WebViewClient());

// Load your server or local file
webView.loadUrl("https://example.com/app.html");
```

---

## 📦 Payload Format  

The payload sent from JavaScript to Android must be JSON, like this:

```json
{
  "fn": "showToast",
  "args": ["Hello"],
  "argTypes": ["string"],
  "ret": "void"
}
```

| Field      | Description |
|------------|-------------|
| `fn`       | Name of the Java method to call (must be `public` in Activity). |
| `args`     | Array of arguments to pass. |
| `argTypes` | Array of argument types (`string`, `int`, `boolean`, `double`). |
| `ret`      | Expected return type (`void`, `string`, `int`, `boolean`, `double`). |

**Example:**  
```js
nativeCall('addInt', [2, 3], ['int','int'], 'int');
```

---

## 🖥 Example Usage  

### In Activity (Java)  
```java
public void showToast(String msg) {
    Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
}

public int addInt(int a, int b) { return a + b; }

public boolean isEven(int n) { return (n % 2) == 0; }

public String appName() {
    return getApplicationInfo().loadLabel(getPackageManager()).toString();
}
```

### In JS (HTML)  
```js
nativeCall('showToast', ['Hello'], ['string'], 'void');
nativeCall('addInt', [3,5], ['int','int'], 'int');
nativeCall('isEven', [8], ['int'], 'boolean');
nativeCall('appName', [], [], 'string');
```
