const bcrypt = require('bcrypt');
const hashPassword = require('../../api/helpers/hash-password');

jest.mock('bcrypt');

describe('Helper: hash-password', () => {
  it('deve gerar um hash usando bcrypt.genSalt e bcrypt.hash', async () => {
    bcrypt.genSalt.mockResolvedValue('saltFake');
    bcrypt.hash.mockResolvedValue('hashFake');

    const result = await hashPassword.fn({ password: 'senha123' });

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 'saltFake');
    expect(result).toBe('hashFake');
  });

  it('deve lançar erro se bcrypt.genSalt falhar', async () => {
    bcrypt.genSalt.mockRejectedValue(new Error('Falha no genSalt'));

    await expect(
      hashPassword.fn({ password: 'senha123' })
    ).rejects.toThrow('Falha no genSalt');
  });

  it('deve lançar erro se bcrypt.hash falhar', async () => {
    bcrypt.genSalt.mockResolvedValue('saltFake');
    bcrypt.hash.mockRejectedValue(new Error('Falha no hash'));

    await expect(
      hashPassword.fn({ password: 'senha123' })
    ).rejects.toThrow('Falha no hash');
  });
});
