export default function handler(req, res) {
  return res.status(200).json({
    isSuccess: false,
    code: 2000,
    message: "Wrong method.",
  });
}
