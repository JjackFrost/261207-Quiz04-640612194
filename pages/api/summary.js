import { readUsersDB, writeUserDB } from "../../backendLibs/dbLib";
import { checkToken } from "../../backendLibs/checkToken";
export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user?.isAdmin)
      return res.status(403).json({ ok: false, message: "Permission denied" });

    const users = readUsersDB();
    let countAdmin = 0;
    let countUser = 0;
    let amountMoney = 0;
    users.forEach((element) => {
      if (element.isAdmin) countAdmin++;
      else {
        countUser++;
        amountMoney += element.money;
      }
    });

    return res.status(200).json({
      ok: true,
      userCount: countUser,
      adminCount: countAdmin,
      totalMoney: amountMoney,
    });
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    //compute DB summary
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
