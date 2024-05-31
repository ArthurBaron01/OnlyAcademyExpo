import { MercadoPagoConfig, Preference } from 'mercadopago';

const accessToken = 'TEST-5281880692326025-052418-e9ccbd8084ff111a400ea68ad064fc79-388190566'; // Substitua pelo seu access token do Mercado Pago

const config = new MercadoPagoConfig({
  accessToken: accessToken
});

const mercadoPago = new Preference(config);

export { accessToken, config, mercadoPago };
