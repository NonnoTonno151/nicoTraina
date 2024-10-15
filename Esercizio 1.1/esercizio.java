import java.util.Scanner;
import java.util.Arrays;


public class esercizio {
	public static void main(String[] arg) {
		Scanner input = new Scanner(System.in);
		int[] numbers = new int[10]; 
		int sum = 0;
		
		System.out.println("Inserisci le tue 10 temperature, immetti il simbolo \"?\" per interrompere la registrazione delle temperature");
		System.out.println();
		
		for(int i = 0; i < 10; i++) {
			System.out.print("Temperatura N." + (i+1)  + ": ");
			int number = Integer.parseInt(input.nextLine());
			numbers[i] = number;
		}
		
		System.out.println(Arrays.toString(numbers));
		
		for(int i = 0; i < 10; i++) {
			sum += numbers[i];
		}

		System.out.println();
		System.out.println("La media dei numeri è: " + sum / 10);
		System.out.println();
	}
}


