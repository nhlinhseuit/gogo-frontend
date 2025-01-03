interface ApiError {
  status: string;
  timestamp: string;
  message: string;
  error_code: string;
  debug_message: string;
  sub_errors: string;
}

export default ApiError;
