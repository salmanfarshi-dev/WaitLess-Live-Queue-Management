
const crypto = require("crypto");
const RefreshToken = require("../modules/auth/RefreshToken");

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const saveRefreshToken = async (userId, token) => {
  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  await RefreshToken.create({
    userId,
    tokenHash,
    expiresAt,
  });
};

const revokeRefreshToken = async (token) => {
  const tokenHash = hashToken(token);

  await RefreshToken.findOneAndUpdate(
    {
      tokenHash,
      revokedAt: null,
    },
    {
      revokedAt: new Date(),
    }
  );
};

const isRefreshTokenValid = async (token, userId) => {
  const tokenHash = hashToken(token);

  const storedToken = await RefreshToken.findOne({
    userId,
    tokenHash,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  });

  return Boolean(storedToken);
};

module.exports = {
  hashToken,
  saveRefreshToken,
  revokeRefreshToken,
  isRefreshTokenValid,
};
