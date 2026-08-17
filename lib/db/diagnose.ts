/**
 * Turns a driver-level connection failure into a short, safe classification.
 *
 * The underlying Mongoose message is written to the server log by `apiError`,
 * but it names cluster hostnames, so only this coarse summary is exposed over
 * HTTP. It exists so a deployed environment can be diagnosed from `/api/health`
 * without needing log access.
 */
export type DbFailureCode =
  | "AUTH_FAILED"
  | "DNS_FAILURE"
  | "UNREACHABLE"
  | "TLS_ERROR"
  | "UNKNOWN";

export interface DbFailure {
  code: DbFailureCode;
  hint: string;
}

export function diagnoseDbError(error: unknown): DbFailure {
  if (!(error instanceof Error)) {
    return { code: "UNKNOWN", hint: "The database driver failed without an error message." };
  }

  const message = error.message;

  if (/bad auth|Authentication failed|not authorized/i.test(message)) {
    return {
      code: "AUTH_FAILED",
      hint: "The cluster was reached but rejected the credentials. Check the username and password in MONGODB_URI, that the password is URL-encoded, and that the database user still exists.",
    };
  }

  if (/queryTxt|querySrv|ENOTFOUND|EAI_AGAIN/i.test(message)) {
    return {
      code: "DNS_FAILURE",
      hint: "The cluster hostname could not be resolved. A mongodb+srv:// URI needs both SRV and TXT DNS lookups to succeed from this environment.",
    };
  }

  if (/certificate|SSL|TLS/i.test(message)) {
    return {
      code: "TLS_ERROR",
      hint: "The TLS handshake with the cluster failed.",
    };
  }

  if (
    error.name === "MongooseServerSelectionError" ||
    error.name === "MongoServerSelectionError" ||
    /ETIMEOUT|ECONNREFUSED|Server selection timed out/i.test(message)
  ) {
    return {
      code: "UNREACHABLE",
      hint: "No cluster node accepted a connection before the timeout. The usual cause is the Atlas Network Access IP list not covering this environment's outbound addresses, which are dynamic on most serverless platforms.",
    };
  }

  return { code: "UNKNOWN", hint: "The database could not be reached." };
}
