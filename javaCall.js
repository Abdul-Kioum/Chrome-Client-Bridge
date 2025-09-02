function javaCall(fn, args = [], types = [], ret = "void") {
    // If types not given, auto-detect
    if (!types.length) {
      types = args.map(v => {
        if (typeof v === "number") return Number.isInteger(v) ? "int" : "double";
        if (typeof v === "boolean") return "boolean";
        return "string";
      });
    }

    // Always stringify args
    const strArgs = args.map(v => String(v));

    // Payload JSON
    const payload = JSON.stringify({
      fn, ret,
      args: strArgs,
      argTypes: types
    });

    // Send to Android
    return prompt("CLIENT", payload) || "";
  }
