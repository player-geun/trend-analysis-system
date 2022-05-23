import dbInit from "./dbInit.js"

export default function handler(req, res) {
    dbInit();
    res.status(200).json({ name: 'John Doe' })
}
  