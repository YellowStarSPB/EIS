async function deleteCounter(id: string) {
  try {
    const res = await fetch(
      `http://showroom.eis24.me/api/v4/test/meters/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default deleteCounter;
