const bcrypt = require('bcrypt');
const comparePassword = require('../../api/helpers/compare-password');

jest.mock('bcrypt');

describe('Helper: compare-password', () => {
  it('deve retornar true quando as senhas coincidirem', async () => {
    bcrypt.compare.mockResolvedValue(true);

    const result = await comparePassword.fn({
      password: 'senha123',
      hashedPassword: 'hashFake'
    });

    expect(bcrypt.compare).toHaveBeenCalledWith('senha123', 'hashFake');
    expect(result).toBe(true);
  });

  it('deve retornar false quando as senhas não coincidirem', async () => {
    bcrypt.compare.mockResolvedValue(false);

    const result = await comparePassword.fn({
      password: 'senhaErrada',
      hashedPassword: 'hashFake'
    });

    expect(bcrypt.compare).toHaveBeenCalledWith('senhaErrada', 'hashFake');
    expect(result).toBe(false);
  });

  it('deve lançar erro se bcrypt.compare falhar', async () => {
    bcrypt.compare.mockRejectedValue(new Error('Erro interno'));

    await expect(
      comparePassword.fn({
        password: 'qualquer',
        hashedPassword: 'hashFake'
      })
    ).rejects.toThrow('Erro interno');
  });
});
