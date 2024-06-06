
async function getAddress(
  ariaId: string
): Promise<string | undefined> {
  try {
    const data = await fetch(
      `http://showroom.eis24.me/api/v4/test/areas/?id=${ariaId}`
    );

    const address = await data.json();

    if (address) {
      return `${address.results[0].house.address} ${address.results[0].str_number_full}`;
    }
  } catch (error) {
    console.log(error);
  }
}

export default getAddress;
